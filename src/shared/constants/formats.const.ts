// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/formats.const.ts
// Generated: 2025-12-23T11:53:07.627Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

// ============================================
// FORMATS & CONTENT TYPES
// ============================================
export const FORMATS = [
  { key: 'live-action', label: 'Live Action', icon: '🎬' },
  { key: 'anime', label: 'Anime', icon: '🎌' },
  { key: '3d-animation', label: '3D Animation', icon: '🎨' },
  { key: '2d-animation', label: '2D Animation', icon: '✏️' },
  { key: 'documentary', label: 'Documentary', icon: '📹' },
  { key: 'stop-motion', label: 'Stop Motion', icon: '🎞️' },
] as const;

export const CONTENT_TYPES = [
  { key: 'movie', label: 'Movie', icon: '🎥' },
  { key: 'series', label: 'TV Series', icon: '📺' },
  { key: 'ova', label: 'OVA', icon: '💿' },
  { key: 'special', label: 'Special', icon: '⭐' },
  { key: 'mini-series', label: 'Mini-series', icon: '📼' },
] as const;

// ============================================
// TYPE HELPERS
// ============================================
export type FormatKey = (typeof FORMATS)[number]['key'];
export type ContentTypeKey = (typeof CONTENT_TYPES)[number]['key'];
