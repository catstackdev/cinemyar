// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/enums/index.ts
// Generated: 2025-12-09T09:00:51.991Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

// Enums synced from Prisma schema (backend/prisma/schema.prisma)
// These enums are used for type safety across frontend and backend

export enum UserRole {
  USER = 'USER',
  PREMIUM = 'PREMIUM',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum MovieStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PUBLISHED = 'PUBLISHED',
}

export enum SubscriptionTier {
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  FAMILY = 'FAMILY',
}

export enum ContentStatus {
  ANNOUNCED = 'ANNOUNCED',
  IN_PRODUCTION = 'IN_PRODUCTION',
  RELEASED = 'RELEASED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum VideoQuality {
  SD_480P = 'SD_480P',
  HD_720P = 'HD_720P',
  HD_1080P = 'HD_1080P',
  UHD_4K = 'UHD_4K',
  UHD_8K = 'UHD_8K',
}

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  SUBTITLE = 'SUBTITLE',
  DOCUMENT = 'DOCUMENT',
  AUDIO = 'AUDIO',
}

export enum MediaStatus {
  PROCESSING = 'PROCESSING',
  PENDING = 'PENDING',
  READY = 'READY',
  ACTIVE = 'ACTIVE',
  FAILED = 'FAILED',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED',
}
