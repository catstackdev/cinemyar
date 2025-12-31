// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/validation/auth/auth-resend-verification.schema.ts
// Generated: 2025-12-31T07:58:14.428Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import { z } from 'zod';
import { emailRules } from '@/shared/validation/helpers';

export const resendVerificationSchema = z.object({
  email: emailRules,
});

export type ResendVerificationDto = z.infer<typeof resendVerificationSchema>;
