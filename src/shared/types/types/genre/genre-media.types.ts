// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/genre/genre-media.types.ts
// Generated: 2025-12-22T16:22:29.038Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import { MediaItem } from './genre-admin-detail.type';

export type GenreMediaType = 'icon' | 'banner' | 'thumbnail';
export type GenreMediaStatus =
  | 'PROCESSING'
  | 'PENDING'
  | 'READY'
  | 'ACTIVE'
  | 'FAILED'
  | 'ARCHIVED'
  | 'DELETED';

// export interface GenreMediaItem {
//   version: number;
//   status: GenreMediaStatus;
//   urls: ImageUrls;
//   previewUrl: string;
// }
export type GenreMediaItem = MediaItem;
