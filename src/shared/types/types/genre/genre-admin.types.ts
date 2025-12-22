// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/genre/genre-admin.types.ts
// Generated: 2025-12-22T11:37:56.573Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import type { ApiResponse, PaginatedResponse } from '../api-response.types';

/**
 * Image URL sizes object
 * Contains responsive image URLs in different sizes
 */
export interface ImageUrls {
  original?: string;
  lg?: string;
  md?: string;
  sm?: string;
  [key: string]: string | undefined; // Allow additional size keys
}

/**
 * Admin Genre (backend type - before serialization)
 * Used internally in the backend with Date objects
 */
export interface AdminGenre {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;

  // Image URLs (JSON stored as objects)
  iconUrls: ImageUrls | Record<string, any> | null;
  bannerUrls: ImageUrls | Record<string, any> | null;
  thumbnailUrls: ImageUrls | Record<string, any> | null;

  // Legacy single URLs (backward compatibility)
  iconUrl: string | null;
  bannerUrl: string | null;
  thumbnailUrl: string | null;

  // Image version tracking
  imageVersion: number | null;
  activeIconVersion: number | null;
  activeBannerVersion: number | null;
  activeThumbnailVersion: number | null;

  // Content
  description: string | null;
  order: number;
  isActive: boolean;
  isFeatured: boolean;

  // Soft delete
  deletedAt: Date | null;
  deletedBy: string | null;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;

  // Relations
  parent: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

/**
 * Admin Genre (frontend type - after serialization)
 * Dates are converted to ISO strings by the HTTP interceptor
 */
export interface AdminGenreSerialized {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;

  // Image URLs
  iconUrls: ImageUrls | null;
  bannerUrls: ImageUrls | null;
  thumbnailUrls: ImageUrls | null;

  // Legacy single URLs
  iconUrl: string | null;
  bannerUrl: string | null;
  thumbnailUrl: string | null;

  // Image version tracking
  imageVersion: number | null;
  activeIconVersion: number | null;
  activeBannerVersion: number | null;
  activeThumbnailVersion: number | null;

  // Content
  description: string | null;
  order: number;
  isActive: boolean;
  isFeatured: boolean;

  // Soft delete
  deletedAt: string | null; // ISO date string
  deletedBy: string | null;

  // Timestamps
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string

  // Relations
  parent: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

/**
 * Paginated response type for admin genre list (backend - controller return type)
 * Used internally in the backend before HTTP interceptor wraps it
 */
export type AdminGenresPaginatedResponse = PaginatedResponse<AdminGenre>;

/**
 * Full API response type for admin genre list (frontend)
 * What the frontend actually receives after HTTP interceptor wrapping
 *
 */

export type AdminGenresApiResponse = ApiResponse<
  PaginatedResponse<AdminGenreSerialized>
>;
