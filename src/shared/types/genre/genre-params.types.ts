// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/genre/genre-params.types.ts
// Generated: 2025-12-31T07:58:14.424Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import type { BasePaginationParams } from '../params';

/**
 * Query parameters for genre pagination
 * Used in GET /admin/genres and GET /genres
 */
export interface GenrePaginationParams extends BasePaginationParams {
  parentId?: string | null; // Can be null for root genres
  sortBy?: 'name' | 'createdAt' | 'updatedAt' | 'slug';
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
