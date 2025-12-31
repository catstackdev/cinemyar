// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/genres/index.ts
// Generated: 2025-12-31T07:58:14.416Z
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
