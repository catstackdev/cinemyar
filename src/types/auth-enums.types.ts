/**
 * Frontend-specific auth role types
 * These are custom roles used for permission management in the frontend
 * NOT derived from backend enums (backend has subscription tiers instead)
 *
 * Backend Enum (SubscriptionTier): USER, PREMIUM, ADMIN
 * Frontend Roles (for permissions): user, translator, ADMIN, super-admin
 */

export type AuthUserRole = "ADMIN" | "SUPER_ADMIN" | "PREMIUM" | "USER";

export const AUTH_ROLES = {
  ADMIN: "ADMIN",
  TRANSLATOR: "translator",
  SUPER_ADMIN: "super-admin",
  USER: "user",
} as const;
