import { apiClient } from "@/lib/axios";
import type { ApiResponse } from "@/shared/types";

/**
 * Job status types from backend
 */
export type JobStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

/**
 * Job API Response
 */
export interface JobStatusData {
  jobId: string;
  status: JobStatus;
  progress: number;
  currentStep?: string;
  message?: string;
  result?: any;
  error?: string;
  createdAt: string;
  completedAt?: string;
}

/**
 * Domain Jobs API Service
 * Handles job status checking via apiClient (uses cookies for auth)
 */
export const domainJobsAPI = {
  /**
   * Get job status (for polling or one-time check)
   * GET /admin/jobs/:jobId
   * Uses apiClient which automatically sends cookies
   */
  async getStatus(jobId: string): Promise<ApiResponse<JobStatusData>> {
    const { data } = await apiClient.get<ApiResponse<JobStatusData>>(
      `/admin/jobs/${jobId}`
    );
    return data;
  },

  /**
   * Get SSE stream URL for job progress
   * Note: EventSource doesn't support custom headers, so we can't send cookies directly
   * Backend must use cookie-based auth from browser's automatic cookie sending
   */
  getStreamUrl(jobId: string): string {
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    // EventSource will automatically send cookies if withCredentials is supported
    return `${API_BASE}/admin/jobs/${jobId}/stream`;
  },
};
