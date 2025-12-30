// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/validation/auth/auth-add-email.schema.ts
// Generated: 2025-12-30T04:21:52.075Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import { z } from 'zod';
import { emailRules } from '@/shared/validation/helpers';

export const addEmailSchema = z.object({
  email: emailRules,
});

export type AddEmailDto = z.infer<typeof addEmailSchema>;
