// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/validation/auth/auth-register.schema.ts
// Generated: 2025-12-22T11:37:56.581Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import { z } from 'zod';
import { emailRules, passwordRules } from '@/shared/types/validation/helpers';

export const registerSchema = z.object({
  // Email is optional - if provided, user will need to verify it
  // If not provided, user can still register with username + password
  email: emailRules.optional(),

  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscore and dash',
    )
    .trim(),

  password: passwordRules,
});

export type RegisterDto = z.infer<typeof registerSchema>;
