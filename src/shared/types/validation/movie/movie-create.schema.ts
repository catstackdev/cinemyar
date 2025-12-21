// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/validation/movie/movie-create.schema.ts
// Generated: 2025-12-21T10:09:08.096Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import { z } from 'zod';

export const createMovieSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  originalTitle: z.string().max(200).optional(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(5000),
  tagline: z.string().max(200).optional(),
  releaseYear: z.number().min(1900).max(2100),
  releaseDate: z.string().datetime().optional(),
  posterUrl: z.string().url('Invalid poster URL'),
  thumbnailUrl: z.string().url('Invalid thumbnail URL'),
  backdropUrl: z.string().url('Invalid backdrop URL').optional(),
  videoUrl: z.string().url('Invalid video URL'),
  trailerUrl: z.string().url('Invalid trailer URL').optional(),
  formats: z.array(z.string()).min(1, 'At least one format is required'),
  contentTypes: z
    .array(z.string())
    .min(1, 'At least one content type is required'),
  moods: z.array(z.string()).optional(),
  themes: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  languages: z.array(z.string()).min(1, 'At least one language is required'),
  countries: z.array(z.string()).min(1, 'At least one country is required'),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  contentRating: z.string().optional(),
  aspectRatio: z.string().optional(),
  isPremiumOnly: z.boolean().optional(),
  director: z.string().optional(),
  genreIds: z.array(z.string().uuid()).min(1, 'At least one genre is required'),
});

export type CreateMovieDto = z.infer<typeof createMovieSchema>;
