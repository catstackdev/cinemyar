// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/validation/movie/movie-query.schema.ts
// Generated: 2025-12-22T11:37:56.583Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import { z } from 'zod';
import { GENRES_FLAT, MOODS, FORMATS } from '@/shared/types/constants';

// Extract valid values from constants
const VALID_GENRES = GENRES_FLAT.map((g) => g.key);
const VALID_MOODS = MOODS.map((m) => m.key);
const VALID_FORMATS = FORMATS.map((f) => f.key);

export const movieQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .pipe(z.number().min(1)),

  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 20))
    .pipe(z.number().min(1).max(100)),

  genres: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => (Array.isArray(val) ? val : val ? [val] : []))
    .pipe(z.array(z.enum(VALID_GENRES as [string, ...string[]]))),

  moods: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => (Array.isArray(val) ? val : val ? [val] : []))
    .pipe(z.array(z.enum(VALID_MOODS as [string, ...string[]]))),

  formats: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => (Array.isArray(val) ? val : val ? [val] : []))
    .pipe(z.array(z.enum(VALID_FORMATS as [string, ...string[]]))),

  isPremiumOnly: z
    .string()
    .optional()
    .transform((val) => val === 'true')
    .pipe(z.boolean()),

  minRating: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined))
    .pipe(z.number().min(0).max(10).optional()),

  releaseYear: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().min(1900).max(2100).optional()),

  search: z.string().optional(),

  sortBy: z
    .enum(['views', 'rating', 'releaseYear', 'createdAt'])
    .optional()
    .default('views'),

  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type MovieQueryDto = z.infer<typeof movieQuerySchema>;
