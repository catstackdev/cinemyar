// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/config/media/genre/genre-image-sizes.config.ts
// Generated: 2025-12-21T10:09:08.090Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * Genre Image Size Configuration
 *
 * Defines all image sizes for genre images (icon, banner, thumbnail)
 * All images are converted to WebP for optimization
 */

export const GenreImageSizes = {
  // Genre Icon (square, for lists/filters)
  icon: {
    original: { width: null, height: null, quality: 95 },
    lg: { width: 256, height: 256, quality: 90 }, // Retina desktop
    md: { width: 128, height: 128, quality: 85 }, // Desktop
    sm: { width: 64, height: 64, quality: 80 }, // Mobile
  },

  // Genre Banner (wide, for hero sections)
  banner: {
    original: { width: null, height: null, quality: 95 },
    lg: { width: 1920, height: 480, quality: 90 }, // Desktop hero
    md: { width: 1280, height: 320, quality: 85 }, // Tablet
    sm: { width: 768, height: 192, quality: 80 }, // Mobile
  },

  // Genre Thumbnail (for cards, 16:9 aspect ratio)
  thumbnail: {
    original: { width: null, height: null, quality: 95 },
    lg: { width: 640, height: 360, quality: 90 }, // 16:9 large
    md: { width: 480, height: 270, quality: 85 }, // 16:9 medium
    sm: { width: 320, height: 180, quality: 80 }, // 16:9 small
  },
} as const;

export type GenreImageType = keyof typeof GenreImageSizes;
export type GenreImageSize = 'original' | 'lg' | 'md' | 'sm';

export interface ImageSizeConfig {
  width: number | null;
  height: number | null;
  quality: number;
}

/**
 * Get all size configurations for a specific image type
 */
export function getGenreImageSizes(
  type: GenreImageType,
): Record<GenreImageSize, ImageSizeConfig> {
  return GenreImageSizes[type];
}

/**
 * Validation constraints
 */
export const GenreImageValidation = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedMimeTypes: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/avif',
  ],
  minDimensions: {
    icon: { width: 64, height: 64 },
    banner: { width: 768, height: 192 },
    thumbnail: { width: 320, height: 180 },
  },
};
