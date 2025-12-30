// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/params/params.types.ts
// Generated: 2025-12-30T04:21:52.073Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

export type OrderParams = 'asc' | 'desc';
export interface BasePaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: OrderParams;
}
export const DefaultPaginationParams: BasePaginationParams = {
  page: 1,
  limit: 10,
  search: '',
  orderBy: 'asc',
};
