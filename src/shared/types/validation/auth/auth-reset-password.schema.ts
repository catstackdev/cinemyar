// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/validation/auth/auth-reset-password.schema.ts
// Generated: 2025-12-14T03:23:38.144Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import { z } from 'zod';
import { passwordRules } from '@/shared/types/validation/helpers';

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  newPassword: passwordRules,
});

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
