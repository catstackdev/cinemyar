// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/permission/device-session-permissions.const.ts
// Generated: 2025-12-31T07:58:14.418Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * Device Session Permissions Helper
 *
 * Centralized device session permissions for session monitoring operations
 * Use these constants in controllers instead of hardcoding permission strings
 */

// ==========================================
// DEVICE SESSION PERMISSION CONSTANTS
// ==========================================

export const DeviceSessionPermissions = {
  // Basic Operations
  VIEW: 'device_session.view',
  REVOKE: 'device_session.revoke',
} as const;

// Type export for TypeScript
export type DeviceSessionPermission =
  (typeof DeviceSessionPermissions)[keyof typeof DeviceSessionPermissions];

// ==========================================
// DEVICE SESSION PERMISSION GROUPS
// ==========================================

/**
 * Permission groups for quick role assignment
 */
export const DeviceSessionPermissionGroups = {
  // Viewer - Read-only access
  VIEWER: [DeviceSessionPermissions.VIEW] as string[],

  // Support - Can view and revoke sessions
  SUPPORT: [
    DeviceSessionPermissions.VIEW,
    DeviceSessionPermissions.REVOKE,
  ] as string[],

  // Admin - Full control
  ADMIN: [
    DeviceSessionPermissions.VIEW,
    DeviceSessionPermissions.REVOKE,
  ] as string[],
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Check if user has all required device session permissions
 */
export function hasDeviceSessionPermissions(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  return requiredPermissions.every((perm) => userPermissions.includes(perm));
}

/**
 * Check if user has any of the device session permissions
 */
export function hasAnyDeviceSessionPermission(
  userPermissions: string[],
  permissions: string[],
): boolean {
  return permissions.some((perm) => userPermissions.includes(perm));
}

/**
 * Get device session permissions for a specific role
 */
export function getDeviceSessionPermissionsForRole(
  role: 'VIEWER' | 'SUPPORT' | 'ADMIN',
): string[] {
  return DeviceSessionPermissionGroups[role];
}

/**
 * Check if permission is a dangerous operation
 */
export function isDeviceSessionDangerousPermission(
  permission: string,
): boolean {
  const dangerousPerms: string[] = [DeviceSessionPermissions.REVOKE];
  return dangerousPerms.includes(permission);
}

// ==========================================
// PERMISSION DESCRIPTIONS
// ==========================================

export const DeviceSessionPermissionDescriptions: Record<string, string> = {
  [DeviceSessionPermissions.VIEW]: 'View user device sessions',
  [DeviceSessionPermissions.REVOKE]: 'Force logout user devices',
};
