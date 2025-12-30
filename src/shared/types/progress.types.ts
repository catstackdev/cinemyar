// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/progress.types.ts
// Generated: 2025-12-30T04:21:52.073Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * Progress event structure for SSE streams
 * Reusable across all long-running operations
 */
export interface ProgressEvent {
  /** Unique job ID */
  jobId: string;
  /** Current step (e.g., "downloading", "processing", "uploading") */
  step: string;
  /** Progress percentage (0-100) */
  progress: number;
  /** Human-readable message */
  message: string;
  /** Current operation status */
  status: 'started' | 'progress' | 'completed' | 'error';
  /** Optional metadata */
  metadata?: Record<string, any>;
  /** Timestamp */
  timestamp: string;
}

/**
 * Progress status types
 */
export type ProgressStatus = 'started' | 'progress' | 'completed' | 'error';
