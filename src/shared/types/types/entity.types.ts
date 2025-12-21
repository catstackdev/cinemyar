// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/entity.types.ts
// Generated: 2025-12-21T10:09:08.093Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

export type APIEntityType =
  | 'genres'
  | 'movies'
  | 'actors'
  | 'subtitle'
  | 'vidows';
export type APiGetEntityVersionActionType = 'preview';
export type APiPostEntityVersionActionType =
  | 'preview'
  | 'approve'
  | 'publish'
  | 'reject'
  | 'rollback'
  | 'recover';
export type APiDelEntityVersionActionType = 'staged' | 'permanent';
