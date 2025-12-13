// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/moods-themes.const.ts
// Generated: 2025-12-13T17:50:25.548Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

// ============================================
// MOODS, THEMES & TAGS
// ============================================
export const MOODS = [
  { key: 'dark', label: 'Dark', emoji: '🌑' },
  { key: 'wholesome', label: 'Wholesome', emoji: '🌟' },
  { key: 'thrilling', label: 'Thrilling', emoji: '⚡' },
  { key: 'emotional', label: 'Emotional', emoji: '💔' },
  { key: 'lighthearted', label: 'Lighthearted', emoji: '☀️' },
  { key: 'intense', label: 'Intense', emoji: '🔥' },
  { key: 'mysterious', label: 'Mysterious', emoji: '❓' },
  { key: 'uplifting', label: 'Uplifting', emoji: '🎈' },
  { key: 'gritty', label: 'Gritty', emoji: '🏴' },
  { key: 'surreal', label: 'Surreal', emoji: '🌀' },
] as const;

export const THEMES = [
  { key: 'time-travel', label: 'Time Travel', icon: '⏰' },
  { key: 'revenge', label: 'Revenge', icon: '⚔️' },
  { key: 'coming-of-age', label: 'Coming of Age', icon: '🌱' },
  { key: 'survival', label: 'Survival', icon: '🏔️' },
  { key: 'redemption', label: 'Redemption', icon: '✨' },
  { key: 'war', label: 'War', icon: '⚔️' },
  { key: 'friendship', label: 'Friendship', icon: '🤝' },
  { key: 'family', label: 'Family', icon: '👨‍👩‍👧' },
  { key: 'betrayal', label: 'Betrayal', icon: '🗡️' },
  { key: 'justice', label: 'Justice', icon: '⚖️' },
] as const;

export const TAGS = [
  { key: 'based-on-manga', label: 'Based on Manga' },
  { key: 'based-on-novel', label: 'Based on Novel' },
  { key: 'based-on-true-story', label: 'Based on True Story' },
  { key: 'cult-classic', label: 'Cult Classic' },
  { key: 'award-winner', label: 'Award Winner' },
  { key: 'critically-acclaimed', label: 'Critically Acclaimed' },
  { key: 'trending', label: 'Trending' },
  { key: 'hidden-gem', label: 'Hidden Gem' },
  { key: 'binge-worthy', label: 'Binge-worthy' },
  { key: 'mind-bending', label: 'Mind-bending' },
] as const;

// ============================================
// TYPE HELPERS
// ============================================
export type MoodKey = (typeof MOODS)[number]['key'];
export type ThemeKey = (typeof THEMES)[number]['key'];
export type TagKey = (typeof TAGS)[number]['key'];

// ============================================
// HELPER FUNCTIONS
// ============================================
export const getMoodByKey = (key: string) => MOODS.find((m) => m.key === key);
