// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/genre/genre-params.types.ts
// Generated: 2025-12-09T09:00:51.991Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

export interface GenrePaginationParams {
  search?: string;
  parentId?: string;
  sortBy?: string;
  orderBy?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
