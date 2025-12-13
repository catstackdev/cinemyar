// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/genre/genre-options.types.ts
// Generated: 2025-12-13T17:50:25.550Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

export type GenreOptionItem = {
  id: string;
  name: string;
  slug: string;
  iconUrls: Record<string, string> | null;
  children?: GenreOptionItem[];
};
