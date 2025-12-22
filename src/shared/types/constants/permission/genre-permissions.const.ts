// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/permission/genre-permissions.const.ts
// Generated: 2025-12-22T16:22:29.031Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * Genre Permissions Helper
 *
 * Centralized genre permissions for all genre-related operations
 * Use these constants in controllers instead of hardcoding permission strings
 */

// ==========================================
// GENRE PERMISSION CONSTANTS
// ==========================================

export const GenrePermissions = {
  // Basic CRUD
  VIEW: 'genre.view',
  CREATE: 'genre.create',
  EDIT: 'genre.edit',
  DELETE: 'genre.delete',

  // Media Management (Images)
  UPLOAD: 'genre.upload',
  APPROVE: 'genre.approve',
  PUBLISH: 'genre.publish',
  REJECT: 'genre.reject',

  // Recovery & Soft Delete
  VIEW_DELETED: 'genre.view.deleted',
  RESTORE: 'genre.restore',
  DELETE_PERMANENT: 'genre.delete.permanent',
} as const;

// Type export for TypeScript
export type GenrePermission =
  (typeof GenrePermissions)[keyof typeof GenrePermissions];

// ==========================================
// GENRE PERMISSION GROUPS
// ==========================================

/**
 * Permission groups for quick role assignment
 */
export const GenrePermissionGroups = {
  // Viewer - Read-only access
  VIEWER: [GenrePermissions.VIEW] as string[],

  // Editor - Can create and edit genres
  EDITOR: [
    GenrePermissions.VIEW,
    GenrePermissions.CREATE,
    GenrePermissions.EDIT,
  ] as string[],

  // Content Manager - Can upload and manage images
  CONTENT_MANAGER: [
    GenrePermissions.VIEW,
    GenrePermissions.CREATE,
    GenrePermissions.EDIT,
    GenrePermissions.UPLOAD,
  ] as string[],

  // Reviewer - Can approve/reject images
  REVIEWER: [
    GenrePermissions.VIEW,
    GenrePermissions.APPROVE,
    GenrePermissions.REJECT,
  ] as string[],

  // Publisher - Can publish approved content
  PUBLISHER: [
    GenrePermissions.VIEW,
    GenrePermissions.APPROVE,
    GenrePermissions.PUBLISH,
  ] as string[],

  // Admin - Full control except permanent delete
  ADMIN: [
    GenrePermissions.VIEW,
    GenrePermissions.CREATE,
    GenrePermissions.EDIT,
    GenrePermissions.DELETE,
    GenrePermissions.UPLOAD,
    GenrePermissions.APPROVE,
    GenrePermissions.PUBLISH,
    GenrePermissions.REJECT,
    GenrePermissions.VIEW_DELETED,
    GenrePermissions.RESTORE,
  ] as string[],

  // Super Admin - All permissions including permanent delete
  SUPER_ADMIN: [
    GenrePermissions.VIEW,
    GenrePermissions.CREATE,
    GenrePermissions.EDIT,
    GenrePermissions.DELETE,
    GenrePermissions.UPLOAD,
    GenrePermissions.APPROVE,
    GenrePermissions.PUBLISH,
    GenrePermissions.REJECT,
    GenrePermissions.VIEW_DELETED,
    GenrePermissions.RESTORE,
    GenrePermissions.DELETE_PERMANENT,
  ] as string[],
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Check if user has all required genre permissions
 */
export function hasGenrePermissions(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  return requiredPermissions.every((perm) => userPermissions.includes(perm));
}

/**
 * Check if user has any of the genre permissions
 */
export function hasAnyGenrePermission(
  userPermissions: string[],
  permissions: string[],
): boolean {
  return permissions.some((perm) => userPermissions.includes(perm));
}

/**
 * Get genre permissions for a specific role
 */
export function getGenrePermissionsForRole(
  role:
    | 'VIEWER'
    | 'EDITOR'
    | 'CONTENT_MANAGER'
    | 'REVIEWER'
    | 'PUBLISHER'
    | 'ADMIN'
    | 'SUPER_ADMIN',
): string[] {
  return GenrePermissionGroups[role];
}

/**
 * Check if permission is a dangerous operation (permanent delete)
 */
export function isGenreDangerousPermission(permission: string): boolean {
  const dangerousPerms: string[] = [GenrePermissions.DELETE_PERMANENT];
  return dangerousPerms.includes(permission);
}

// ==========================================
// PERMISSION DESCRIPTIONS
// ==========================================

export const GenrePermissionDescriptions: Record<string, string> = {
  [GenrePermissions.VIEW]: 'View genre list and details',
  [GenrePermissions.CREATE]: 'Create new genres',
  [GenrePermissions.EDIT]: 'Edit genre name, slug, parent, description',
  [GenrePermissions.DELETE]: 'Soft delete genres (recoverable)',

  [GenrePermissions.UPLOAD]: 'Upload genre images (icon, banner, thumbnail)',
  [GenrePermissions.APPROVE]: 'Approve staged images (PENDING → READY)',
  [GenrePermissions.PUBLISH]: 'Publish approved images (READY → ACTIVE)',
  [GenrePermissions.REJECT]: 'Reject staged images with reason',

  [GenrePermissions.VIEW_DELETED]: 'View soft-deleted genres',
  [GenrePermissions.RESTORE]: 'Restore soft-deleted genres',
  [GenrePermissions.DELETE_PERMANENT]:
    'Permanently delete genres (cannot undo)',
};

// ==========================================
// USAGE EXAMPLES
// ==========================================

/**
 * Example usage in controllers:
 *
 * import { GenrePermissions } from '@/shared/constants';
 *
 * // Basic CRUD
 * @Get()
 * @Permissions(GenrePermissions.VIEW)
 * async findAll() { }
 *
 * @Post()
 * @Permissions(GenrePermissions.CREATE)
 * async create() { }
 *
 * @Put(':id')
 * @Permissions(GenrePermissions.EDIT)
 * async update() { }
 *
 * @Delete(':id')
 * @Permissions(GenrePermissions.DELETE)
 * async remove() { }
 *
 * // Media operations
 * @Post(':id/images/:type')
 * @Permissions(GenrePermissions.UPLOAD)
 * async uploadImage() { }
 *
 * @Post(':id/images/:type/approve/:version')
 * @Permissions(GenrePermissions.APPROVE)
 * async approveImage() { }
 *
 * @Post(':id/images/:type/publish/:version')
 * @Permissions(GenrePermissions.PUBLISH)
 * async publishImage() { }
 *
 * // Recovery operations
 * @Get('deleted')
 * @Permissions(GenrePermissions.VIEW_DELETED)
 * async findAllDeleted() { }
 *
 * @Post('deleted/:id/restore')
 * @Permissions(GenrePermissions.RESTORE)
 * async restore() { }
 *
 * @Delete('deleted/:id/permanent')
 * @Permissions(GenrePermissions.DELETE_PERMANENT)
 * async permanentDelete() { }
 *
 * // Multiple permissions (user needs ALL)
 * @Post(':id/publish-now')
 * @Permissions(GenrePermissions.APPROVE, GenrePermissions.PUBLISH)
 * async approveAndPublish() { }
 *
 * // Check permissions in service
 * if (hasGenrePermissions(user.permissions, [GenrePermissions.EDIT])) {
 *   // Allow edit
 * }
 *
 * // Get permissions for role assignment
 * const editorPerms = getGenrePermissionsForRole('EDITOR');
 * // Returns: ['genre.view', 'genre.create', 'genre.edit']
 */
