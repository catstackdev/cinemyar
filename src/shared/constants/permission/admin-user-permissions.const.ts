// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/permission/admin-user-permissions.const.ts
// Generated: 2025-12-31T07:58:14.418Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * Admin User Permissions Helper
 *
 * Centralized admin user permissions for all admin user management operations
 * Use these constants in controllers instead of hardcoding permission strings
 */

// ==========================================
// ADMIN USER PERMISSION CONSTANTS
// ==========================================

export const AdminUserPermissions = {
  // Basic Operations
  VIEW: 'admin_user.view',
  EDIT: 'admin_user.edit',

  // Security Operations
  BAN: 'admin_user.ban',
  UNBAN: 'admin_user.unban',

  // Monitoring
  SESSIONS: 'admin_user.sessions',
  ACTIVITY: 'admin_user.activity',
} as const;

// Type export for TypeScript
export type AdminUserPermission =
  (typeof AdminUserPermissions)[keyof typeof AdminUserPermissions];

// ==========================================
// ADMIN USER PERMISSION GROUPS
// ==========================================

/**
 * Permission groups for quick role assignment
 */
export const AdminUserPermissionGroups = {
  // Viewer - Read-only access to admin users
  VIEWER: [AdminUserPermissions.VIEW] as string[],

  // Monitor - Can view admin users and their activity
  MONITOR: [
    AdminUserPermissions.VIEW,
    AdminUserPermissions.SESSIONS,
    AdminUserPermissions.ACTIVITY,
  ] as string[],

  // Manager - Can view and edit admin users
  MANAGER: [
    AdminUserPermissions.VIEW,
    AdminUserPermissions.EDIT,
    AdminUserPermissions.SESSIONS,
    AdminUserPermissions.ACTIVITY,
  ] as string[],

  // Super Admin - Full control over admin users
  SUPER_ADMIN: [
    AdminUserPermissions.VIEW,
    AdminUserPermissions.EDIT,
    AdminUserPermissions.BAN,
    AdminUserPermissions.UNBAN,
    AdminUserPermissions.SESSIONS,
    AdminUserPermissions.ACTIVITY,
  ] as string[],
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Check if user has all required admin user permissions
 */
export function hasAdminUserPermissions(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  return requiredPermissions.every((perm) => userPermissions.includes(perm));
}

/**
 * Check if user has any of the admin user permissions
 */
export function hasAnyAdminUserPermission(
  userPermissions: string[],
  permissions: string[],
): boolean {
  return permissions.some((perm) => userPermissions.includes(perm));
}

/**
 * Get admin user permissions for a specific role
 */
export function getAdminUserPermissionsForRole(
  role: 'VIEWER' | 'MONITOR' | 'MANAGER' | 'SUPER_ADMIN',
): string[] {
  return AdminUserPermissionGroups[role];
}

/**
 * Check if permission is a dangerous operation (ban)
 */
export function isAdminUserDangerousPermission(permission: string): boolean {
  const dangerousPerms: string[] = [AdminUserPermissions.BAN];
  return dangerousPerms.includes(permission);
}

// ==========================================
// PERMISSION DESCRIPTIONS
// ==========================================

export const AdminUserPermissionDescriptions: Record<string, string> = {
  [AdminUserPermissions.VIEW]: 'View admin and super admin users',
  [AdminUserPermissions.EDIT]: 'Edit admin user details',
  [AdminUserPermissions.BAN]:
    'Ban admin users and force logout (cannot ban SUPER_ADMIN)',
  [AdminUserPermissions.UNBAN]: 'Unban admin users',
  [AdminUserPermissions.SESSIONS]:
    'View and revoke admin device sessions (force logout)',
  [AdminUserPermissions.ACTIVITY]: 'View admin activity logs and audit trails',
};

// ==========================================
// USAGE EXAMPLES
// ==========================================

/**
 * Example usage in controllers:
 *
 * import { AdminUserPermissions } from '@/shared/constants/permission/admin-user-permissions.const';
 *
 * // Basic Operations
 * @Get()
 * @Permissions(AdminUserPermissions.VIEW)
 * async getAllAdmins() { }
 *
 * @Get(':id')
 * @Permissions(AdminUserPermissions.VIEW)
 * async getAdminById() { }
 *
 * @Patch(':id')
 * @Permissions(AdminUserPermissions.EDIT)
 * async updateAdmin() { }
 *
 * // Security Operations
 * @Post(':id/ban')
 * @Permissions(AdminUserPermissions.BAN)
 * async banAdmin() { }
 *
 * @Post(':id/unban')
 * @Permissions(AdminUserPermissions.UNBAN)
 * async unbanAdmin() { }
 *
 * // Monitoring Operations
 * @Get(':id/sessions')
 * @Permissions(AdminUserPermissions.SESSIONS)
 * async getAdminSessions() { }
 *
 * @Delete(':userId/sessions/:sessionId')
 * @Permissions(AdminUserPermissions.SESSIONS)
 * async revokeAdminSession() { }
 *
 * @Get(':id/activity')
 * @Permissions(AdminUserPermissions.ACTIVITY)
 * async getAdminActivity() { }
 *
 * // Check permissions in service
 * if (hasAdminUserPermissions(user.permissions, [AdminUserPermissions.EDIT])) {
 *   // Allow edit
 * }
 *
 * // Get permissions for role assignment
 * const managerPerms = getAdminUserPermissionsForRole('MANAGER');
 * // Returns: ['admin_user.view', 'admin_user.edit', 'admin_user.sessions', 'admin_user.activity']
 */
