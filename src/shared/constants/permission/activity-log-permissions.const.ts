// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/permission/activity-log-permissions.const.ts
// Generated: 2025-12-30T04:21:52.058Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * Activity Log Permissions Helper
 *
 * Centralized activity log permissions for audit trail operations
 * Use these constants in controllers instead of hardcoding permission strings
 */

// ==========================================
// ACTIVITY LOG PERMISSION CONSTANTS
// ==========================================

export const ActivityLogPermissions = {
  // Basic Operations
  VIEW: 'activity_log.view',
  EXPORT: 'activity_log.export',
} as const;

// Type export for TypeScript
export type ActivityLogPermission =
  (typeof ActivityLogPermissions)[keyof typeof ActivityLogPermissions];

// ==========================================
// ACTIVITY LOG PERMISSION GROUPS
// ==========================================

/**
 * Permission groups for quick role assignment
 */
export const ActivityLogPermissionGroups = {
  // Viewer - Read-only access
  VIEWER: [ActivityLogPermissions.VIEW] as string[],

  // Auditor - Can view and export logs
  AUDITOR: [
    ActivityLogPermissions.VIEW,
    ActivityLogPermissions.EXPORT,
  ] as string[],

  // Admin - Full control
  ADMIN: [
    ActivityLogPermissions.VIEW,
    ActivityLogPermissions.EXPORT,
  ] as string[],
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Check if user has all required activity log permissions
 */
export function hasActivityLogPermissions(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  return requiredPermissions.every((perm) => userPermissions.includes(perm));
}

/**
 * Check if user has any of the activity log permissions
 */
export function hasAnyActivityLogPermission(
  userPermissions: string[],
  permissions: string[],
): boolean {
  return permissions.some((perm) => userPermissions.includes(perm));
}

/**
 * Get activity log permissions for a specific role
 */
export function getActivityLogPermissionsForRole(
  role: 'VIEWER' | 'AUDITOR' | 'ADMIN',
): string[] {
  return ActivityLogPermissionGroups[role];
}

// ==========================================
// PERMISSION DESCRIPTIONS
// ==========================================

export const ActivityLogPermissionDescriptions: Record<string, string> = {
  [ActivityLogPermissions.VIEW]: 'View admin activity logs',
  [ActivityLogPermissions.EXPORT]: 'Export activity logs',
};
