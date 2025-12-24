// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/genres/genre-helpers.ts
// Generated: 2025-12-23T11:53:07.628Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import { GENRE_HIERARCHY } from './genre-hierarchy.const';

type GenreChild = (typeof GENRE_HIERARCHY)[number]['children'][number];

export const GENRES_FLAT = GENRE_HIERARCHY.flatMap((parent) => [
  {
    ...parent,
    isParent: true,
    parentKey: null as string | null,
    children: undefined,
  },
  ...(parent.children?.map((child: GenreChild) => ({
    key: child.key,
    label: child.label,
    emoji: child.emoji,
    color: parent.color,
    isParent: false,
    parentKey: parent.key,
  })) || []),
]);

export const getGenreByKey = (key: string) =>
  GENRES_FLAT.find((g) => g.key === key);

export const getParentGenre = (childKey: string) => {
  const child = GENRES_FLAT.find((g) => g.key === childKey && !g.isParent);
  if (child?.parentKey) {
    return GENRES_FLAT.find((g) => g.key === child.parentKey && g.isParent);
  }
  return null;
};

export const getChildGenres = (parentKey: string) =>
  GENRES_FLAT.filter((g) => g.parentKey === parentKey);

export const isParentGenre = (key: string) =>
  GENRES_FLAT.some((g) => g.key === key && g.isParent);

export const isChildGenre = (key: string) =>
  GENRES_FLAT.some((g) => g.key === key && !g.isParent);
