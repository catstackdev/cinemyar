// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/user.types.ts
// Generated: 2025-12-14T03:23:38.143Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

export type UserRole = 'USER' | 'PREMIUM' | 'ADMIN' | 'SUPER_ADMIN';
export type SubscriptionTier = 'BASIC' | 'PREMIUM' | 'FAMILY';
export interface User {
  id: string;
  email: string | null;
  username: string;
  role: UserRole;
  subscriptionTier?: SubscriptionTier;
  subscriptionExpiresAt?: string;
  createdAt: string;
  isEmailVerified?: boolean;
  permissions?: string[]; // Array of permissions like ['genre.*', 'movie.approve']
  roles?: DynamicRoleInfo[]; // Array of assigned dynamic roles
}

export interface DynamicRoleInfo {
  id: string;
  name: string;
  displayName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email?: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// Cookie-based auth response (tokens sent as HTTP-only cookies)
export interface AuthCookieResponse {
  user: User;
  accessTokenExpiresAt: number; // Unix timestamp in ms
  requiresEmailVerification?: boolean; // Only present on registration
  canSubscribe: boolean; // Can user subscribe to paid tiers?
  subscriptionBlockReason?: string; // Why can't user subscribe (if canSubscribe is false)
  /** Structured permissions for FE permission checks */
  can?: Record<string, Record<string, boolean>>;
}
