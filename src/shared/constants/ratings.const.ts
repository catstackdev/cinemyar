// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/ratings.const.ts
// Generated: 2025-12-31T07:58:14.421Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

// ============================================
// CONTENT RATINGS
// ============================================
export const CONTENT_RATINGS = [
  { key: 'G', label: 'G - General Audiences', age: 0 },
  { key: 'PG', label: 'PG - Parental Guidance', age: 0 },
  { key: 'PG-13', label: 'PG-13 - Parents Cautioned', age: 13 },
  { key: 'R', label: 'R - Restricted', age: 17 },
  { key: 'NC-17', label: 'NC-17 - Adults Only', age: 18 },
] as const;
