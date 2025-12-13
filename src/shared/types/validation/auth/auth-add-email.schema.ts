// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/validation/auth/auth-add-email.schema.ts
// Generated: 2025-12-09T09:00:51.993Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import { z } from 'zod';
import { emailRules } from '@/shared/types/validation/helpers';

export const addEmailSchema = z.object({
  email: emailRules,
});

export type AddEmailDto = z.infer<typeof addEmailSchema>;
