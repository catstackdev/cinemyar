// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/validation/auth/auth-verify-email.schema.ts
// Generated: 2025-12-20T14:39:43.571Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import { z } from 'zod';

export const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});

export type VerifyEmailDto = z.infer<typeof verifyEmailSchema>;
