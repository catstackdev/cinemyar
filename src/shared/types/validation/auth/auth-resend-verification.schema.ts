// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/validation/auth/auth-resend-verification.schema.ts
// Generated: 2025-12-19T17:03:52.542Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import { z } from 'zod';
import { emailRules } from '@/shared/types/validation/helpers';

export const resendVerificationSchema = z.object({
  email: emailRules,
});

export type ResendVerificationDto = z.infer<typeof resendVerificationSchema>;
