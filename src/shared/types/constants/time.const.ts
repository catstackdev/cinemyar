// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/time.const.ts
// Generated: 2025-12-17T07:26:43.462Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

// export const Time = {
//   SECOND: 1000,
//   MINUTE: 60 * 1000,
//   HOUR: 60 * 60 * 1000,
//   DAY: 24 * 60 * 60 * 1000,
//   WEEK: 7 * 24 * 60 * 60 * 1000,
// } as const;

export const Time = {
  SECOND: 1_000,
  MINUTE: 60_000,
  HOUR: 3_600_000,
  DAY: 86_400_000,
  WEEK: 604_800_000,
} as const;

export type TimeUnit = keyof typeof Time;
