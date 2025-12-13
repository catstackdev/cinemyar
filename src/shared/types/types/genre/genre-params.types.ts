// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/genre/genre-params.types.ts
// Generated: 2025-12-13T17:50:25.550Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * Query parameters for genre pagination
 * Used in GET /admin/genres and GET /genres
 */
export interface GenrePaginationParams {
  search?: string;
  parentId?: string | null; // Can be null for root genres
  sortBy?: 'name' | 'createdAt'; // Allowed sort fields
  orderBy?: 'asc' | 'desc';
  page?: number; // Default: 1
  limit?: number; // Default: 10
}
