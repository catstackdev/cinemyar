// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/prisma-enums.const.ts
// Generated: 2025-12-30T04:21:52.062Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * Prisma Enum Constants
 *
 * These constants mirror Prisma enums but are plain TypeScript
 * so they can be shared with the frontend without Prisma dependency.
 *
 * Auto-synced to frontend via scripts/sync-to-frontend.ts
 */

// ==========================================
// User Roles
// ==========================================
export const UserRole = {
  USER: 'USER',
  PREMIUM: 'PREMIUM',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

// ==========================================
// Subscription Tiers
// ==========================================
export const SubscriptionTier = {
  BASIC: 'BASIC',
  PREMIUM: 'PREMIUM',
  FAMILY: 'FAMILY',
} as const;

export type SubscriptionTier =
  (typeof SubscriptionTier)[keyof typeof SubscriptionTier];

// ==========================================
// Video Quality
// ==========================================
export const VideoQuality = {
  SD_480P: 'SD_480P',
  HD_720P: 'HD_720P',
  HD_1080P: 'HD_1080P',
  UHD_4K: 'UHD_4K',
  UHD_8K: 'UHD_8K',
} as const;

export type VideoQuality = (typeof VideoQuality)[keyof typeof VideoQuality];

// ==========================================
// Media Type
// ==========================================
export const MediaType = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  SUBTITLE: 'SUBTITLE',
  DOCUMENT: 'DOCUMENT',
  AUDIO: 'AUDIO',
} as const;

export type MediaType = (typeof MediaType)[keyof typeof MediaType];

// ==========================================
// Media File Status
// ==========================================
export const MediaFileStatus = {
  PROCESSING: 'PROCESSING',
  PENDING: 'PENDING',
  READY: 'READY',
  ACTIVE: 'ACTIVE',
  FAILED: 'FAILED',
  ARCHIVED: 'ARCHIVED',
  DELETED: 'DELETED',
} as const;

export type MediaFileStatus =
  (typeof MediaFileStatus)[keyof typeof MediaFileStatus];

// ==========================================
// Genre Image Types
// ==========================================
export const GenreImageType = {
  ICON: 'ICON',
  BANNER: 'BANNER',
  THUMBNAIL: 'THUMBNAIL',
} as const;

export type GenreImageType =
  (typeof GenreImageType)[keyof typeof GenreImageType];

// ==========================================
// Media Approval Status
// ==========================================
export const MediaVersionStatus = {
  DRAFT: 'DRAFT',
  // PENDING: 'PENDING',
  // APPROVED: 'APPROVED',
  // REJECTED: 'REJECTED',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
  ERROR: 'ERROR',
} as const;

export type MediaVersionStatus =
  (typeof MediaVersionStatus)[keyof typeof MediaVersionStatus];

// ==========================================
// Image Variants
// ==========================================
export const ImageVariant = {
  SM: 'SM',
  MD: 'MD',
  LG: 'LG',
  ORIGINAL: 'ORIGINAL',
} as const;

export type ImageVariant = (typeof ImageVariant)[keyof typeof ImageVariant];

// ==========================================
// Movie Image Types
// ==========================================
export const MovieImageType = {
  POSTER: 'POSTER',
  BACKDROP: 'BACKDROP',
  LOGO: 'LOGO',
  THUMBNAIL: 'THUMBNAIL',
} as const;

export type MovieImageType =
  (typeof MovieImageType)[keyof typeof MovieImageType];

// ==========================================
// Actor Image Types
// ==========================================
export const ActorImageType = {
  PROFILE: 'PROFILE',
  HEADSHOT: 'HEADSHOT',
} as const;

export type ActorImageType =
  (typeof ActorImageType)[keyof typeof ActorImageType];

// ==========================================
// Content Status
// ==========================================
export const ContentStatus = {
  RELEASED: 'RELEASED',
  UPCOMING: 'UPCOMING',
  IN_PRODUCTION: 'IN_PRODUCTION',
  RUMORED: 'RUMORED',
  CANCELLED: 'CANCELLED',
} as const;

export type ContentStatus = (typeof ContentStatus)[keyof typeof ContentStatus];

// ==========================================
// Movie Status
// ==========================================
export const MovieStatus = {
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
} as const;

export type MovieStatus = (typeof MovieStatus)[keyof typeof MovieStatus];
