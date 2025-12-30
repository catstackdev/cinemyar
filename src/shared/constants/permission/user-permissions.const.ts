// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/permission/user-permissions.const.ts
// Generated: 2025-12-30T04:21:52.062Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * User Permissions Helper
 *
 * Centralized user permissions for all user moderation operations
 * Use these constants in controllers instead of hardcoding permission strings
 */

// ==========================================
// USER PERMISSION CONSTANTS
// ==========================================

export const UserPermissions = {
  // Basic Operations
  VIEW: 'user.view',
  EDIT: 'user.edit',

  // Moderation
  BAN: 'user.ban',
  UNBAN: 'user.unban',
  DELETE: 'user.delete',
} as const;

// Type export for TypeScript
export type UserPermission =
  (typeof UserPermissions)[keyof typeof UserPermissions];

// ==========================================
// USER PERMISSION GROUPS
// ==========================================

/**
 * Permission groups for quick role assignment
 */
export const UserPermissionGroups = {
  // Viewer - Read-only access
  VIEWER: [UserPermissions.VIEW] as string[],

  // Support - Can view and edit users
  SUPPORT: [UserPermissions.VIEW, UserPermissions.EDIT] as string[],

  // Moderator - Can ban/unban users
  MODERATOR: [
    UserPermissions.VIEW,
    UserPermissions.BAN,
    UserPermissions.UNBAN,
  ] as string[],

  // Admin - Full control
  ADMIN: [
    UserPermissions.VIEW,
    UserPermissions.EDIT,
    UserPermissions.BAN,
    UserPermissions.UNBAN,
    UserPermissions.DELETE,
  ] as string[],
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Check if user has all required user permissions
 */
export function hasUserPermissions(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  return requiredPermissions.every((perm) => userPermissions.includes(perm));
}

/**
 * Check if user has any of the user permissions
 */
export function hasAnyUserPermission(
  userPermissions: string[],
  permissions: string[],
): boolean {
  return permissions.some((perm) => userPermissions.includes(perm));
}

/**
 * Get user permissions for a specific role
 */
export function getUserPermissionsForRole(
  role: 'VIEWER' | 'SUPPORT' | 'MODERATOR' | 'ADMIN',
): string[] {
  return UserPermissionGroups[role];
}

/**
 * Check if permission is a dangerous operation
 */
export function isUserDangerousPermission(permission: string): boolean {
  const dangerousPerms: string[] = [
    UserPermissions.BAN,
    UserPermissions.DELETE,
  ];
  return dangerousPerms.includes(permission);
}

// ==========================================
// PERMISSION DESCRIPTIONS
// ==========================================

export const UserPermissionDescriptions: Record<string, string> = {
  [UserPermissions.VIEW]: 'View user list and profiles',
  [UserPermissions.EDIT]: 'Edit user details',
  [UserPermissions.BAN]: 'Ban user accounts',
  [UserPermissions.UNBAN]: 'Unban user accounts',
  [UserPermissions.DELETE]: 'Delete user accounts',
};
