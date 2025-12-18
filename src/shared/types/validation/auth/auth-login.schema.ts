// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/validation/auth/auth-login.schema.ts
// Generated: 2025-12-17T07:26:43.466Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import { z } from 'zod';

/**
 * Login schema - supports login with email OR username
 * Since email is optional during registration, users can login with:
 * - Email (if they provided one)
 * - Username (always required during registration)
 */
export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, 'Email or username is required')
    .describe('Email or username to login with'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginDto = z.infer<typeof loginSchema>;
