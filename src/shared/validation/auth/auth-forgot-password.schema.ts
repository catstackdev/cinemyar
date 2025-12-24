// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/validation/auth/auth-forgot-password.schema.ts
// Generated: 2025-12-23T11:53:07.632Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import { z } from 'zod';
import { emailRules } from '@/shared/validation/helpers';

export const forgotPasswordSchema = z.object({
  email: emailRules,
});

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;
