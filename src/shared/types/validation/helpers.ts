// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/validation/helpers.ts
// Generated: 2025-12-20T14:39:43.571Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import { z } from 'zod';

/**
 * Common password validation rules
 * Can be reused across different schemas
 */
export const passwordRules = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .max(100, 'Password is too long')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

/**
 * Common email validation with normalization
 */
export const emailRules = z
  .string()
  .email('Invalid email address')
  .toLowerCase()
  .trim();

/**
 * UUID validation
 */
export const uuidRules = z.string().uuid('Invalid UUID format');

/**
 * Pagination query params
 */
export const paginationSchema = z.object({
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
});

/**
 * Helper to convert string boolean from query params
 */
export const stringToBoolean = z
  .string()
  .optional()
  .transform((val) => val === 'true')
  .pipe(z.boolean());

/**
 * Helper to convert string number from query params
 */
export const stringToNumber = (min?: number, max?: number) =>
  z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined))
    .pipe(
      z
        .number()
        .min(min ?? -Infinity)
        .max(max ?? Infinity)
        .optional(),
    );
