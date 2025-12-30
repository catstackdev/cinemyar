// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/entity/api-entity.types.ts
// Generated: 2025-12-30T04:21:52.067Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

export type APIEntityType =
  | 'genres'
  | 'movies'
  | 'actors'
  | 'subtitle'
  | 'vidows';
export type APiGetEntityVersionActionType = 'preview';
export type APiPostEntityVersionActionType =
  | 'publish'
  | 'unpublish'
  | 'recover';
export type APiDelEntityVersionActionType = 'staged' | 'permanent';
