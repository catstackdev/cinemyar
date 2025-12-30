// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/permission/subscription-permissions.const.ts
// Generated: 2025-12-30T04:21:52.061Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * Subscription Permissions Helper
 *
 * Centralized subscription permissions for all subscription management operations
 * Use these constants in controllers instead of hardcoding permission strings
 */

// ==========================================
// SUBSCRIPTION PERMISSION CONSTANTS
// ==========================================

export const SubscriptionPermissions = {
  // Basic Operations
  VIEW: 'subscription.view',
  MANAGE: 'subscription.manage',

  // Configuration (Super Admin Only)
  CONFIG: 'subscription.config',
} as const;

// Type export for TypeScript
export type SubscriptionPermission =
  (typeof SubscriptionPermissions)[keyof typeof SubscriptionPermissions];

// ==========================================
// SUBSCRIPTION PERMISSION GROUPS
// ==========================================

/**
 * Permission groups for quick role assignment
 */
export const SubscriptionPermissionGroups = {
  // Viewer - Read-only access
  VIEWER: [SubscriptionPermissions.VIEW] as string[],

  // Support - Can view and manage subscriptions
  SUPPORT: [
    SubscriptionPermissions.VIEW,
    SubscriptionPermissions.MANAGE,
  ] as string[],

  // Super Admin - Can configure tiers
  SUPER_ADMIN: [
    SubscriptionPermissions.VIEW,
    SubscriptionPermissions.MANAGE,
    SubscriptionPermissions.CONFIG,
  ] as string[],
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Check if user has all required subscription permissions
 */
export function hasSubscriptionPermissions(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  return requiredPermissions.every((perm) => userPermissions.includes(perm));
}

/**
 * Check if user has any of the subscription permissions
 */
export function hasAnySubscriptionPermission(
  userPermissions: string[],
  permissions: string[],
): boolean {
  return permissions.some((perm) => userPermissions.includes(perm));
}

/**
 * Get subscription permissions for a specific role
 */
export function getSubscriptionPermissionsForRole(
  role: 'VIEWER' | 'SUPPORT' | 'SUPER_ADMIN',
): string[] {
  return SubscriptionPermissionGroups[role];
}

/**
 * Check if permission is super admin only
 */
export function isSubscriptionSuperAdminOnly(permission: string): boolean {
  const superAdminOnlyPerms: string[] = [SubscriptionPermissions.CONFIG];
  return superAdminOnlyPerms.includes(permission);
}

// ==========================================
// PERMISSION DESCRIPTIONS
// ==========================================

export const SubscriptionPermissionDescriptions: Record<string, string> = {
  [SubscriptionPermissions.VIEW]: 'View user subscriptions',
  [SubscriptionPermissions.MANAGE]: 'Modify user subscriptions',
  [SubscriptionPermissions.CONFIG]: 'Configure subscription tiers',
};
