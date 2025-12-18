// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/api-response.types.ts
// Generated: 2025-12-17T07:26:43.463Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Error response format (consistent with success responses - flat structure)
 * Same level fields as ApiResponse for easier frontend handling
 */

interface ValidationError {
  errors: Record<string, string[]>;
}
export interface ApiError {
  success: false;
  message: string;
  code?: string;
  details?: Record<string, any> | string[] | ValidationError;
  timestamp: string;
}
