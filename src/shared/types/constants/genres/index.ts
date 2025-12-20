// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/genres/index.ts
// Generated: 2025-12-20T14:39:43.566Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

export { GENRE_HIERARCHY } from './genre-hierarchy.const';
export type {
  GenreKey,
  GenreParentKey,
  GenreChildKey,
} from './genre-hierarchy.const';
export {
  GENRES_FLAT,
  getGenreByKey,
  getParentGenre,
  getChildGenres,
  isParentGenre,
  isChildGenre,
} from './genre-helpers';
