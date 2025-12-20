// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/validation/auth/auth-change-password.schema.ts
// Generated: 2025-12-20T14:39:43.570Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import { z } from 'zod';
import { passwordRules } from '@/shared/types/validation/helpers';

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordRules,
});

export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;
