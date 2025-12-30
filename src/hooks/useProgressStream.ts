import { useState, useEffect, useCallback, useRef } from 'react';
import type { ProgressEvent } from '@/shared/types/progress.types';

export interface UseProgressStreamOptions {
  /** SSE endpoint URL */
  url: string;
  /** Whether to automatically connect on mount */
  autoConnect?: boolean;
  /** Callback when progress updates */
  onProgress?: (event: ProgressEvent) => void;
  /** Callback when operation completes */
  onComplete?: (event: ProgressEvent) => void;
  /** Callback when error occurs */
  onError?: (event: ProgressEvent) => void;
  /** Authorization token for authenticated endpoints */
  token?: string;
}

export interface UseProgressStreamReturn {
  /** Current progress event */
  progress: ProgressEvent | null;
  /** Whether stream is connected */
  isConnected: boolean;
  /** Whether operation is in progress */
  isLoading: boolean;
  /** Whether operation completed successfully */
  isCompleted: boolean;
  /** Whether an error occurred */
  hasError: boolean;
  /** Error event if any */
  error: ProgressEvent | null;
  /** Connect to SSE stream */
  connect: () => void;
  /** Disconnect from SSE stream */
  disconnect: () => void;
  /** Reset state */
  reset: () => void;
}

/**
 * Reusable hook for consuming SSE progress streams
 * 
 * Use this for any long-running operation with progress tracking:
 * - Image regeneration
 * - Video processing
 * - Subtitle generation
 * - Batch operations
 * - File uploads
 * 
 * @example
 * ```tsx
 * const { progress, isLoading, isCompleted, connect } = useProgressStream({
 *   url: `/admin/genres/${genreId}/images/${type}/${version}/regenerate/stream?jobId=${jobId}`,
 *   token: authToken,
 *   onComplete: (event) => {
 *     toast.success('Regeneration complete!');
 *     console.log('Final URLs:', event.metadata?.urls);
 *   },
 *   onError: (event) => {
 *     toast.error(event.message);
 *   },
 * });
 * 
 * // In your component
 * <Button onClick={connect} disabled={isLoading}>
 *   Regenerate Image
 * </Button>
 * 
 * {isLoading && (
 *   <div>
 *     <ProgressBar value={progress?.progress || 0} />
 *     <p>{progress?.message}</p>
 *   </div>
 * )}
 * ```
 */
export function useProgressStream(
  options: UseProgressStreamOptions,
): UseProgressStreamReturn {
  const {
    url,
    autoConnect = false,
    onProgress,
    onComplete,
    onError,
    token,
  } = options;

  const [progress, setProgress] = useState<ProgressEvent | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<ProgressEvent | null>(null);

  const eventSourceRef = useRef<EventSource | null>(null);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsConnected(false);
    }
  }, []);

  const reset = useCallback(() => {
    disconnect();
    setProgress(null);
    setIsLoading(false);
    setIsCompleted(false);
    setHasError(false);
    setError(null);
  }, [disconnect]);

  const connect = useCallback(() => {
    // Reset state before connecting
    setProgress(null);
    setIsLoading(true);
    setIsCompleted(false);
    setHasError(false);
    setError(null);

    // Close existing connection if any
    disconnect();

    try {
      // Create EventSource with auth header if token provided
      // Note: EventSource doesn't support custom headers in browser
      // So we append token as query param for authenticated endpoints
      const fullUrl = token ? `${url}&token=${encodeURIComponent(token)}` : url;
      
      const eventSource = new EventSource(fullUrl);
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        setIsConnected(true);
        console.log('[SSE] Connected to progress stream');
      };

      // Handle all progress events
      eventSource.addEventListener('progress', (e: MessageEvent) => {
        const event: ProgressEvent = JSON.parse(e.data);
        setProgress(event);
        onProgress?.(event);
      });

      eventSource.addEventListener('started', (e: MessageEvent) => {
        const event: ProgressEvent = JSON.parse(e.data);
        setProgress(event);
        setIsLoading(true);
        onProgress?.(event);
      });

      eventSource.addEventListener('completed', (e: MessageEvent) => {
        const event: ProgressEvent = JSON.parse(e.data);
        setProgress(event);
        setIsLoading(false);
        setIsCompleted(true);
        onComplete?.(event);
        
        // Auto-disconnect after completion
        setTimeout(() => disconnect(), 1000);
      });

      eventSource.addEventListener('error', (e: MessageEvent) => {
        try {
          const event: ProgressEvent = JSON.parse(e.data);
          setProgress(event);
          setError(event);
          setHasError(true);
          setIsLoading(false);
          onError?.(event);
        } catch {
          // EventSource error event format
          const errorEvent: ProgressEvent = {
            jobId: '',
            step: 'error',
            progress: 0,
            message: 'Connection error occurred',
            status: 'error',
            timestamp: new Date().toISOString(),
          };
          setError(errorEvent);
          setHasError(true);
          setIsLoading(false);
          onError?.(errorEvent);
        }
        
        // Auto-disconnect after error
        setTimeout(() => disconnect(), 1000);
      });

      eventSource.onerror = () => {
        console.error('[SSE] Connection error');
        setIsConnected(false);
        
        // Only set error state if we haven't already processed an error event
        if (!hasError) {
          const errorEvent: ProgressEvent = {
            jobId: '',
            step: 'connection_error',
            progress: 0,
            message: 'Lost connection to server',
            status: 'error',
            timestamp: new Date().toISOString(),
          };
          setError(errorEvent);
          setHasError(true);
          setIsLoading(false);
          onError?.(errorEvent);
        }
        
        disconnect();
      };
    } catch (err) {
      console.error('[SSE] Failed to connect:', err);
      const errorEvent: ProgressEvent = {
        jobId: '',
        step: 'init_error',
        progress: 0,
        message: err instanceof Error ? err.message : 'Failed to initialize connection',
        status: 'error',
        timestamp: new Date().toISOString(),
      };
      setError(errorEvent);
      setHasError(true);
      setIsLoading(false);
      onError?.(errorEvent);
    }
  }, [url, token, disconnect, onProgress, onComplete, onError, hasError]);

  // Auto-connect on mount if enabled
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    // Cleanup on unmount
    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  return {
    progress,
    isConnected,
    isLoading,
    isCompleted,
    hasError,
    error,
    connect,
    disconnect,
    reset,
  };
}
