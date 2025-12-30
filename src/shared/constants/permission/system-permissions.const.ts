// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/permission/system-permissions.const.ts
// Generated: 2025-12-30T04:21:52.062Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * System Permissions Helper
 *
 * Centralized system permissions for system configuration operations
 * Use these constants in controllers instead of hardcoding permission strings
 */

// ==========================================
// SYSTEM PERMISSION CONSTANTS
// ==========================================

export const SystemPermissions = {
  // System Operations (All Super Admin Only)
  SETTINGS: 'system.settings',
  CLEANUP: 'system.cleanup',
  CACHE: 'system.cache',
} as const;

// Type export for TypeScript
export type SystemPermission =
  (typeof SystemPermissions)[keyof typeof SystemPermissions];

// ==========================================
// SYSTEM PERMISSION GROUPS
// ==========================================

/**
 * Permission groups for quick role assignment
 */
export const SystemPermissionGroups = {
  // Super Admin - Full system control
  SUPER_ADMIN: [
    SystemPermissions.SETTINGS,
    SystemPermissions.CLEANUP,
    SystemPermissions.CACHE,
  ] as string[],
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Check if user has all required system permissions
 */
export function hasSystemPermissions(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  return requiredPermissions.every((perm) => userPermissions.includes(perm));
}

/**
 * Check if user has any of the system permissions
 */
export function hasAnySystemPermission(
  userPermissions: string[],
  permissions: string[],
): boolean {
  return permissions.some((perm) => userPermissions.includes(perm));
}

/**
 * Get system permissions for a specific role
 */
export function getSystemPermissionsForRole(role: 'SUPER_ADMIN'): string[] {
  return SystemPermissionGroups[role];
}

/**
 * Check if permission is super admin only (all system permissions are)
 */
export function isSystemSuperAdminOnly(permission: string): boolean {
  return Object.values(SystemPermissions).includes(
    permission as SystemPermission,
  );
}

/**
 * Check if permission is a dangerous operation
 */
export function isSystemDangerousPermission(permission: string): boolean {
  const dangerousPerms: string[] = [SystemPermissions.CLEANUP];
  return dangerousPerms.includes(permission);
}

// ==========================================
// PERMISSION DESCRIPTIONS
// ==========================================

export const SystemPermissionDescriptions: Record<string, string> = {
  [SystemPermissions.SETTINGS]: 'Modify system settings',
  [SystemPermissions.CLEANUP]: 'Trigger media cleanup jobs',
  [SystemPermissions.CACHE]: 'Clear/manage cache',
};
