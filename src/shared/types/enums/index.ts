// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/enums/index.ts
// Generated: 2025-12-22T11:37:56.571Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

// Enums synced from Prisma schema (backend/prisma/schema.prisma)
// 🚨 AUTO-GENERATED - type-only enums for frontend

export const UserRole = {
  USER: 'USER',
  PREMIUM: 'PREMIUM',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const MovieStatus = {
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  PUBLISHED: 'PUBLISHED',
} as const;
export type MovieStatus = (typeof MovieStatus)[keyof typeof MovieStatus];

export const SubscriptionTier = {
  BASIC: 'BASIC',
  PREMIUM: 'PREMIUM',
  FAMILY: 'FAMILY',
} as const;
export type SubscriptionTier = (typeof SubscriptionTier)[keyof typeof SubscriptionTier];

export const ContentStatus = {
  ANNOUNCED: 'ANNOUNCED',
  IN_PRODUCTION: 'IN_PRODUCTION',
  RELEASED: 'RELEASED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;
export type ContentStatus = (typeof ContentStatus)[keyof typeof ContentStatus];

export const VideoQuality = {
  SD_480P: 'SD_480P',
  HD_720P: 'HD_720P',
  HD_1080P: 'HD_1080P',
  UHD_4K: 'UHD_4K',
  UHD_8K: 'UHD_8K',
} as const;
export type VideoQuality = (typeof VideoQuality)[keyof typeof VideoQuality];

export const MediaType = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  SUBTITLE: 'SUBTITLE',
  DOCUMENT: 'DOCUMENT',
  AUDIO: 'AUDIO',
} as const;
export type MediaType = (typeof MediaType)[keyof typeof MediaType];

export const MediaStatus = {
  PROCESSING: 'PROCESSING',
  PENDING: 'PENDING',
  READY: 'READY',
  ACTIVE: 'ACTIVE',
  FAILED: 'FAILED',
  ARCHIVED: 'ARCHIVED',
  DELETED: 'DELETED',
} as const;
export type MediaStatus = (typeof MediaStatus)[keyof typeof MediaStatus];
