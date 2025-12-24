// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/permission/role-permissions.const.ts
// Generated: 2025-12-23T11:53:07.629Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * Role (Admin Role Management) Permissions Helper
 *
 * Centralized role permissions for admin role management operations
 * Use these constants in controllers instead of hardcoding permission strings
 */

// ==========================================
// ROLE PERMISSION CONSTANTS
// ==========================================

export const RolePermissions = {
  // Basic CRUD
  VIEW: 'admin_role.view',
  CREATE: 'admin_role.create',
  EDIT: 'admin_role.edit',
  DELETE: 'admin_role.delete',

  // Role Assignment
  ASSIGN: 'admin_role.assign',
} as const;

// Type export for TypeScript
export type RolePermission =
  (typeof RolePermissions)[keyof typeof RolePermissions];

// ==========================================
// ROLE PERMISSION GROUPS
// ==========================================

/**
 * Permission groups for quick role assignment
 */
export const RolePermissionGroups = {
  // Viewer - Read-only access to roles
  VIEWER: [RolePermissions.VIEW] as string[],

  // Admin - Can view and assign roles (but not create/edit/delete)
  ADMIN: [RolePermissions.VIEW, RolePermissions.ASSIGN] as string[],

  // Super Admin - Full control over role management
  SUPER_ADMIN: [
    RolePermissions.VIEW,
    RolePermissions.CREATE,
    RolePermissions.EDIT,
    RolePermissions.DELETE,
    RolePermissions.ASSIGN,
  ] as string[],
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Check if user has all required role permissions
 */
export function hasRolePermissions(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  return requiredPermissions.every((perm) => userPermissions.includes(perm));
}

/**
 * Check if user has any of the role permissions
 */
export function hasAnyRolePermission(
  userPermissions: string[],
  permissions: string[],
): boolean {
  return permissions.some((perm) => userPermissions.includes(perm));
}

/**
 * Get role permissions for a specific role level
 */
export function getRolePermissionsForRole(
  role: 'VIEWER' | 'ADMIN' | 'SUPER_ADMIN',
): string[] {
  return RolePermissionGroups[role];
}

/**
 * Check if permission is a dangerous operation (delete roles)
 */
export function isRoleDangerousPermission(permission: string): boolean {
  const dangerousPerms: string[] = [RolePermissions.DELETE];
  return dangerousPerms.includes(permission);
}

/**
 * Check if permission is SUPER_ADMIN only
 */
export function isRoleSuperAdminOnly(permission: string): boolean {
  const superAdminOnlyPerms: string[] = [
    RolePermissions.CREATE,
    RolePermissions.EDIT,
    RolePermissions.DELETE,
    RolePermissions.ASSIGN,
  ];
  return superAdminOnlyPerms.includes(permission);
}

// ==========================================
// PERMISSION DESCRIPTIONS
// ==========================================

export const RolePermissionDescriptions: Record<string, string> = {
  [RolePermissions.VIEW]: 'View dynamic roles and their permissions',
  [RolePermissions.CREATE]: 'Create new dynamic roles with custom permissions',
  [RolePermissions.EDIT]: 'Edit role name, description, and permissions',
  [RolePermissions.DELETE]: 'Delete dynamic roles (only if no users assigned)',
  [RolePermissions.ASSIGN]: 'Assign/revoke roles to/from ADMIN users',
};

// ==========================================
// USAGE EXAMPLES
// ==========================================

/**
 * Example usage in controllers:
 *
 * import { RolePermissions } from '@/shared/constants';
 *
 * // Basic CRUD
 * @Get()
 * @Permissions(RolePermissions.VIEW)
 * async findAll() { }
 *
 * @Get(':id')
 * @Permissions(RolePermissions.VIEW)
 * async findOne() { }
 *
 * @Post()
 * @Permissions(RolePermissions.CREATE)
 * async create() { }
 *
 * @Put(':id')
 * @Permissions(RolePermissions.EDIT)
 * async update() { }
 *
 * @Delete(':id')
 * @Permissions(RolePermissions.DELETE)
 * async remove() { }
 *
 * // Role assignment
 * @Get('users/:userId')
 * @Permissions(RolePermissions.VIEW)
 * async getUserRoles() { }
 *
 * @Post('users/:userId/assign')
 * @Permissions(RolePermissions.ASSIGN)
 * async assignRole() { }
 *
 * @Delete('users/:userId/roles/:roleId')
 * @Permissions(RolePermissions.ASSIGN)
 * async removeRole() { }
 *
 * // Check permissions in service
 * if (hasRolePermissions(user.permissions, [RolePermissions.CREATE])) {
 *   // Allow create
 * }
 *
 * // Get permissions for role assignment
 * const superAdminPerms = getRolePermissionsForRole('SUPER_ADMIN');
 * // Returns: ['admin_role.view', 'admin_role.create', 'admin_role.edit', 'admin_role.delete', 'admin_role.assign']
 */
