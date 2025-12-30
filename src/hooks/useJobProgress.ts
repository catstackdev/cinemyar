import { useState, useEffect, useCallback, useRef } from 'react';
import { domainJobsAPI } from '@/modules/domain/jobs/api';
import type { ProgressEvent } from '@/shared/types/progress.types';

export interface UseJobProgressOptions {
  /** Job ID to track */
  jobId: string;
  /** Whether to use SSE (real-time) or polling */
  mode?: 'sse' | 'polling';
  /** Polling interval in ms (default: 1000) */
  pollingInterval?: number;
  /** Whether to automatically start on mount */
  autoStart?: boolean;
  /** Callback when progress updates */
  onProgress?: (event: ProgressEvent) => void;
  /** Callback when operation completes */
  onComplete?: (event: ProgressEvent) => void;
  /** Callback when error occurs */
  onError?: (event: ProgressEvent) => void;
}

export interface UseJobProgressReturn {
  /** Current progress event */
  progress: ProgressEvent | null;
  /** Whether tracking is active */
  isTracking: boolean;
  /** Whether operation is in progress */
  isLoading: boolean;
  /** Whether operation completed successfully */
  isCompleted: boolean;
  /** Whether an error occurred */
  hasError: boolean;
  /** Error event if any */
  error: ProgressEvent | null;
  /** Start tracking */
  start: () => void;
  /** Stop tracking */
  stop: () => void;
  /** Reset state */
  reset: () => void;
}

/**
 * Track job progress using centralized /admin/jobs API
 * Supports both SSE (real-time) and polling modes
 * 
 * @example
 * ```tsx
 * const { progress, isLoading, start } = useJobProgress({
 *   jobId: 'abc-123',
 *   mode: 'sse', // or 'polling'
 *   onComplete: () => {
 *     toast.success('Job completed!');
 *     refetchData();
 *   },
 * });
 * 
 * <Button onClick={start}>Track Job</Button>
 * {isLoading && <ProgressBar value={progress?.progress || 0} />}
 * ```
 * 
 * Note: Uses cookie-based authentication. Ensure user is logged in before tracking jobs.
 */
export function useJobProgress(
  options: UseJobProgressOptions,
): UseJobProgressReturn {
  const {
    jobId,
    mode = 'sse',
    pollingInterval = 1000,
    autoStart = false,
    onProgress,
    onComplete,
    onError,
  } = options;

  const [progress, setProgress] = useState<ProgressEvent | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<ProgressEvent | null>(null);

  const eventSourceRef = useRef<EventSource | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // SSE mode
  const startSSE = useCallback(() => {
    if (eventSourceRef.current) {
      console.log('[SSE] Already connected, skipping');
      return;
    }

    if (!jobId) {
      console.warn('[SSE] No jobId provided');
      return;
    }

    try {
      const url = domainJobsAPI.getStreamUrl(jobId);
      console.log('[SSE] Connecting to:', url);
      
      // Note: EventSource automatically sends cookies for same-origin requests
      // Backend must accept credentials in CORS headers
      const eventSource = new EventSource(url, { withCredentials: true });
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log('[SSE] Connection opened');
        setIsTracking(true);
        setIsLoading(true);
      };

      const handleEvent = (e: MessageEvent) => {
        try {
          // Skip empty/undefined data (SSE heartbeat/comments)
          if (!e.data || e.data === 'undefined' || e.data.trim() === '') {
            console.log('[SSE] Skipping empty event data');
            return;
          }

          let parsedData = JSON.parse(e.data);
          
          // Backend SSE library wraps event in { data: {...}, type: '...' }
          // Unwrap if needed
          if (parsedData.data && typeof parsedData.data === 'object') {
            console.log('[SSE] Unwrapping nested data structure');
            parsedData = parsedData.data;
          }

          const event: ProgressEvent = parsedData;
          console.log('[SSE] Received event:', event);
          setProgress(event);
          onProgress?.(event);

          if (event.status === 'completed') {
            console.log('[SSE] Job completed');
            setIsLoading(false);
            setIsCompleted(true);
            onComplete?.(event);
            stopSSE();
          } else if (event.status === 'error') {
            console.error('[SSE] Job failed:', event.message);
            setError(event);
            setHasError(true);
            setIsLoading(false);
            onError?.(event);
            stopSSE();
          }
        } catch (err) {
          console.error('[SSE] Failed to parse event:', err, 'Raw data:', e.data);
        }
      };

      // Listen to all standard SSE events
      eventSource.addEventListener('progress', handleEvent);
      eventSource.addEventListener('started', handleEvent);
      eventSource.addEventListener('completed', handleEvent);
      eventSource.addEventListener('error', handleEvent);
      
      // Also listen to the default 'message' event
      eventSource.addEventListener('message', (e) => {
        console.log('[SSE] Received default message event:', e.data);
        handleEvent(e);
      });

      eventSource.onerror = (err) => {
        console.error('[SSE] Connection error:', err);
        console.error('[SSE] EventSource readyState:', eventSource.readyState);
        console.error('[SSE] EventSource url:', eventSource.url);
        
        // EventSource readyState: 0=CONNECTING, 1=OPEN, 2=CLOSED
        if (eventSource.readyState === EventSource.CLOSED) {
          console.error('[SSE] Connection closed by server - possible auth issue or job not found');
        }
        
        // Create error event
        const errorEvent: ProgressEvent = {
          jobId,
          step: 'connection_error',
          progress: 0,
          message: 'SSE connection failed',
          status: 'error',
          timestamp: new Date().toISOString(),
        };
        setError(errorEvent);
        setHasError(true);
        onError?.(errorEvent);
        
        // Don't auto-reconnect on error, just close
        stopSSE();
        setIsLoading(false);
      };
    } catch (err) {
      console.error('[SSE] Failed to connect:', err);
      const errorEvent: ProgressEvent = {
        jobId,
        step: 'connection_error',
        progress: 0,
        message: 'Failed to connect to progress stream',
        status: 'error',
        timestamp: new Date().toISOString(),
      };
      setError(errorEvent);
      setHasError(true);
      onError?.(errorEvent);
    }
  }, [jobId, onProgress, onComplete, onError]);

  const stopSSE = useCallback(() => {
    if (eventSourceRef.current) {
      console.log('[SSE] Closing connection');
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsTracking(false);
    }
  }, []);

  // Polling mode
  const startPolling = useCallback(async () => {
    if (pollingIntervalRef.current) return;

    setIsTracking(true);
    setIsLoading(true);

    const poll = async () => {
      try {
        const response = await domainJobsAPI.getStatus(jobId);

        if (!response.success || !response.data) {
          throw new Error('Job not found');
        }

        const event: ProgressEvent = {
          jobId: response.data.jobId,
          step: response.data.currentStep || '',
          progress: response.data.progress,
          message: response.data.message || '',
          status:
            response.data.status === 'COMPLETED'
              ? 'completed'
              : response.data.status === 'FAILED'
                ? 'error'
                : response.data.status === 'PROCESSING'
                  ? 'progress'
                  : 'started',
          timestamp: response.timestamp,
          metadata: response.data.result,
        };

        setProgress(event);
        onProgress?.(event);

        if (response.data.status === 'COMPLETED') {
          setIsLoading(false);
          setIsCompleted(true);
          onComplete?.(event);
          stopPolling();
        } else if (response.data.status === 'FAILED') {
          const errorEvent: ProgressEvent = {
            ...event,
            status: 'error',
            message: response.data.error || 'Job failed',
          };
          setError(errorEvent);
          setHasError(true);
          setIsLoading(false);
          onError?.(errorEvent);
          stopPolling();
        }
      } catch (err) {
        console.error('[Polling] Failed to fetch job status:', err);
        const errorEvent: ProgressEvent = {
          jobId,
          step: 'polling_error',
          progress: 0,
          message: err instanceof Error ? err.message : 'Failed to fetch status',
          status: 'error',
          timestamp: new Date().toISOString(),
        };
        setError(errorEvent);
        setHasError(true);
        setIsLoading(false);
        onError?.(errorEvent);
        stopPolling();
      }
    };

    // Poll immediately, then at interval
    await poll();
    pollingIntervalRef.current = setInterval(poll, pollingInterval);
  }, [jobId, pollingInterval, onProgress, onComplete, onError]);

  const stopPolling = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
      setIsTracking(false);
    }
  }, []);

  const start = useCallback(() => {
    if (mode === 'sse') {
      startSSE();
    } else {
      startPolling();
    }
  }, [mode, startSSE, startPolling]);

  const stop = useCallback(() => {
    stopSSE();
    stopPolling();
  }, [stopSSE, stopPolling]);

  const reset = useCallback(() => {
    stop();
    setProgress(null);
    setIsLoading(false);
    setIsCompleted(false);
    setHasError(false);
    setError(null);
  }, [stop]);

  // Auto-start (only when jobId or autoStart changes)
  useEffect(() => {
    if (autoStart && jobId) {
      start();
    }
    return () => {
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, jobId]); // Only re-run when jobId or autoStart changes

  return {
    progress,
    isTracking,
    isLoading,
    isCompleted,
    hasError,
    error,
    start,
    stop,
    reset,
  };
}
