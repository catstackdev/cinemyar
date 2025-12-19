// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/genre/genre-params.types.ts
// Generated: 2025-12-19T17:03:52.538Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * Query parameters for genre pagination
 * Used in GET /admin/genres and GET /genres
 */
export interface GenrePaginationParams {
  search?: string;
  parentId?: string | null; // Can be null for root genres
  sortBy?: 'name' | 'createdAt' | 'updatedAt' | 'slug';
  orderBy?: 'asc' | 'desc';
  page?: number; // Default: 1
  limit?: number; // Default: 10
}

export interface GenreOptionParams {
  onlyParent?: boolean;
}
export interface GenreCreate {
  name: string;
  slug: string;
  parentId?: string;
  description?: string;
  order?: number;
  isActive?: boolean;
  isFeatured?: boolean;
}
