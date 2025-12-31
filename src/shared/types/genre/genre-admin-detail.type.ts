// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/genre/genre-admin-detail.type.ts
// Generated: 2025-12-31T07:58:14.424Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import type { MediaVersionStatus } from '@/shared/constants';
import type { UserAudit } from '../user';
import type { ImageUrls } from './genre-admin.types';

export interface GenreDetailData {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  description: string | null;
  order: number;
  isActive: boolean;
  isFeatured: boolean;

  // Current Active URLs (Convenience fields from your JSON)
  iconUrl: string | null;
  bannerUrl: string | null;
  thumbnailUrl: string | null;
  iconUrls: ImageUrls | null;
  bannerUrls: ImageUrls | null;
  thumbnailUrls: ImageUrls | null;

  // Versioning info
  imageVersion: number;
  activeIconVersion: number | null;
  activeBannerVersion: number | null;
  activeThumbnailVersion: number | null;

  // Timestamps
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  deletedBy: string | null;

  // Relations & Arrays
  parent: any | null; // Update if you have a Parent interface
  children: GenreChild[];
  icons: MediaItem[];
  banners: MediaItem[];
  thumbnails: MediaItem[];

  _count: {
    movies: number;
  };
}

export interface MediaItem {
  version: number;
  status: MediaVersionStatus;
  urls: ImageUrls;
  uploadedAt?: string;
  uploadedBy?: UserAudit | null;
  approvedAt?: string | null;
  approvedBy?: UserAudit | null;
  publishedAt?: string | null;
  publishedBy?: UserAudit | null;
  deletedBy?: string | null;
}

export interface GenreChild {
  id: string;
  name: string;
  slug: string;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}
