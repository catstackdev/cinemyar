// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/config/media/user/user-image-sizes.config.ts
// Generated: 2025-12-30T04:21:52.052Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * User Image Size Configuration
 *
 * Defines all image sizes for user images (avatar, cover, banner)
 * All images are converted to WebP for optimization
 */

export const UserImageSizes = {
  // User Avatar (square, profile picture)
  avatar: {
    original: { width: null, height: null, quality: 95 },
    lg: { width: 512, height: 512, quality: 90 }, // High-res profile
    md: { width: 256, height: 256, quality: 85 }, // Standard profile
    sm: { width: 128, height: 128, quality: 80 }, // Thumbnail/lists
    xs: { width: 64, height: 64, quality: 75 }, // Very small (comments, etc)
  },

  // User Cover (wide, profile header)
  cover: {
    original: { width: null, height: null, quality: 95 },
    lg: { width: 1920, height: 480, quality: 90 }, // Desktop header
    md: { width: 1280, height: 320, quality: 85 }, // Tablet header
    sm: { width: 768, height: 192, quality: 80 }, // Mobile header
  },

  // User Banner (promotional, for premium/featured users)
  banner: {
    original: { width: null, height: null, quality: 95 },
    lg: { width: 1920, height: 600, quality: 90 }, // Large banner
    md: { width: 1280, height: 400, quality: 85 }, // Medium banner
    sm: { width: 768, height: 240, quality: 80 }, // Small banner
  },
} as const;

export type UserImageType = keyof typeof UserImageSizes;
export type UserImageSize = 'original' | 'lg' | 'md' | 'sm' | 'xs';

export interface ImageSizeConfig {
  width: number | null;
  height: number | null;
  quality: number;
}

/**
 * Get all size configurations for a specific image type
 */
export function getUserImageSizes(
  type: UserImageType,
): Record<string, ImageSizeConfig> {
  return UserImageSizes[type];
}

/**
 * Validation constraints
 */
export const UserImageValidation = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedMimeTypes: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/avif',
  ],
  minDimensions: {
    avatar: { width: 128, height: 128 }, // Min avatar size
    cover: { width: 768, height: 192 }, // Min cover size
    banner: { width: 768, height: 240 }, // Min banner size
  },
};
