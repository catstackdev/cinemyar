// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/genre/genre-options.types.ts
// Generated: 2025-12-20T14:39:43.568Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import type { ApiResponse } from '../api-response.types';

export type GenreOptionItem = {
  id: string;
  name: string;
  slug: string;
  iconUrls: Record<string, string> | null;
  children?: GenreOptionItem[];
};

/**
 * Full API response type for  genre option list (frontend)
 *
 */

export type PublicGenresOptionsApiResponse = ApiResponse<GenreOptionItem[]>;
