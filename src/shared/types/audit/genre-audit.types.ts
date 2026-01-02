// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/audit/genre-audit.types.ts
// Generated: 2025-12-31T15:40:29.222Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import type { PaginatedResponse, PaginationMeta } from '../api-response.types';
import type { BasePaginationParams } from '../params';
import type { AuditUser } from './base-audit-user.types';
export interface AuditGenre {
  id: string;
  name: string;
  slug: string;
}
export interface GenreAuditMetadata {
  version?: number;
  imageType?: string;
  newStatus?: string;
  previousStatus?: string;
  route?: string;
  method?: string;
  params?: Record<string, string>;
  body?: any;
}

export interface GenreAuditEntry {
  id: string;
  genreId: string;
  action: string;
  userId: string;
  reason: string | null;
  metadata: GenreAuditMetadata;
  createdAt: string;
  expiresAt: string | null;
  genre: AuditGenre;
  user: AuditUser;
}

export interface GenreAuditFilters {
  actions: string[];
  users: AuditUser[];
}
export interface GenreAuditResponseData
  extends PaginatedResponse<GenreAuditEntry> {
  meta: PaginationMeta;
  filters: GenreAuditFilters;
}
export interface GenreAuditPaginatedParams extends BasePaginationParams {
  action?: string;
  userId?: string;
  genreId?: string;
}
