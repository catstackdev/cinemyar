// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/countries-languages.const.ts
// Generated: 2025-12-30T04:21:52.052Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

// ============================================
// COUNTRIES & LANGUAGES
// ============================================
export const COUNTRIES = [
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲' },
] as const;

export const LANGUAGES = [
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'zh', name: 'Mandarin', nativeName: '中文' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'my', name: 'Burmese', nativeName: 'မြန်မာ' },
] as const;

// ============================================
// TYPE HELPERS
// ============================================
export type CountryCode = (typeof COUNTRIES)[number]['code'];
export type LanguageCode = (typeof LANGUAGES)[number]['code'];

// ============================================
// HELPER FUNCTIONS
// ============================================
export const getCountryByCode = (code: string) =>
  COUNTRIES.find((c) => c.code === code);

export const getLanguageByCode = (code: string) =>
  LANGUAGES.find((l) => l.code === code);
