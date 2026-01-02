// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/permission/movie-permissions.const.ts
// Generated: 2025-12-31T15:40:29.217Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * Movie Permissions Helper
 *
 * Centralized movie permissions for all movie-related operations
 * Use these constants in controllers instead of hardcoding permission strings
 */

// ==========================================
// MOVIE PERMISSION CONSTANTS
// ==========================================

export const MoviePermissions = {
  // Basic CRUD
  VIEW: 'movie.view',
  CREATE: 'movie.create',
  EDIT: 'movie.edit',
  DELETE: 'movie.delete',

  // Workflow Management
  REVIEW: 'movie.review',
  APPROVE: 'movie.approve',
  REJECT: 'movie.reject',
  PUBLISH: 'movie.publish',
  UNPUBLISH: 'movie.unpublish',
  FEATURE: 'movie.feature',

  // Content Management
  TRANSLATE: 'movie.translate',
  UPLOAD: 'movie.upload',

  // Recovery & Soft Delete
  VIEW_DELETED: 'movie.view.deleted',
  RESTORE: 'movie.restore',
  DELETE_PERMANENT: 'movie.delete.permanent',
  AUDIT: 'movie.audit',
} as const;

// Type export for TypeScript
export type MoviePermission =
  (typeof MoviePermissions)[keyof typeof MoviePermissions];

// ==========================================
// MOVIE PERMISSION GROUPS
// ==========================================

/**
 * Permission groups for quick role assignment
 */
export const MoviePermissionGroups = {
  // Viewer - Read-only access
  VIEWER: [MoviePermissions.VIEW] as string[],

  // Editor - Can create and edit movies
  EDITOR: [
    MoviePermissions.VIEW,
    MoviePermissions.CREATE,
    MoviePermissions.EDIT,
  ] as string[],

  // Content Manager - Can upload media and translate
  CONTENT_MANAGER: [
    MoviePermissions.VIEW,
    MoviePermissions.CREATE,
    MoviePermissions.EDIT,
    MoviePermissions.UPLOAD,
    MoviePermissions.TRANSLATE,
  ] as string[],

  // Reviewer - Can review and approve/reject movies
  REVIEWER: [
    MoviePermissions.VIEW,
    MoviePermissions.REVIEW,
    MoviePermissions.APPROVE,
    MoviePermissions.REJECT,
  ] as string[],

  // Publisher - Can publish approved movies
  PUBLISHER: [
    MoviePermissions.VIEW,
    MoviePermissions.APPROVE,
    MoviePermissions.PUBLISH,
    MoviePermissions.UNPUBLISH,
    MoviePermissions.FEATURE,
  ] as string[],

  // Admin - Full control except permanent delete
  ADMIN: [
    MoviePermissions.VIEW,
    MoviePermissions.CREATE,
    MoviePermissions.EDIT,
    MoviePermissions.DELETE,
    MoviePermissions.REVIEW,
    MoviePermissions.APPROVE,
    MoviePermissions.REJECT,
    MoviePermissions.PUBLISH,
    MoviePermissions.UNPUBLISH,
    MoviePermissions.FEATURE,
    MoviePermissions.TRANSLATE,
    MoviePermissions.UPLOAD,
    MoviePermissions.VIEW_DELETED,
    MoviePermissions.RESTORE,
  ] as string[],

  // Super Admin - All permissions including permanent delete
  SUPER_ADMIN: [
    MoviePermissions.VIEW,
    MoviePermissions.CREATE,
    MoviePermissions.EDIT,
    MoviePermissions.DELETE,
    MoviePermissions.REVIEW,
    MoviePermissions.APPROVE,
    MoviePermissions.REJECT,
    MoviePermissions.PUBLISH,
    MoviePermissions.UNPUBLISH,
    MoviePermissions.FEATURE,
    MoviePermissions.TRANSLATE,
    MoviePermissions.UPLOAD,
    MoviePermissions.VIEW_DELETED,
    MoviePermissions.RESTORE,
    MoviePermissions.DELETE_PERMANENT,
  ] as string[],
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Check if user has all required movie permissions
 */
export function hasMoviePermissions(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  return requiredPermissions.every((perm) => userPermissions.includes(perm));
}

/**
 * Check if user has any of the movie permissions
 */
export function hasAnyMoviePermission(
  userPermissions: string[],
  permissions: string[],
): boolean {
  return permissions.some((perm) => userPermissions.includes(perm));
}

/**
 * Get movie permissions for a specific role
 */
export function getMoviePermissionsForRole(
  role:
    | 'VIEWER'
    | 'EDITOR'
    | 'CONTENT_MANAGER'
    | 'REVIEWER'
    | 'PUBLISHER'
    | 'ADMIN'
    | 'SUPER_ADMIN',
): string[] {
  return MoviePermissionGroups[role];
}

/**
 * Check if permission is a dangerous operation (permanent delete)
 */
export function isMovieDangerousPermission(permission: string): boolean {
  const dangerousPerms: string[] = [MoviePermissions.DELETE_PERMANENT];
  return dangerousPerms.includes(permission);
}

// ==========================================
// PERMISSION DESCRIPTIONS
// ==========================================

export const MoviePermissionDescriptions: Record<string, string> = {
  [MoviePermissions.VIEW]: 'View movie list and details',
  [MoviePermissions.CREATE]: 'Create new movie entries',
  [MoviePermissions.EDIT]: 'Edit movie metadata',
  [MoviePermissions.DELETE]: 'Soft delete movies (recoverable)',

  [MoviePermissions.REVIEW]: 'Review submitted movies',
  [MoviePermissions.APPROVE]: 'Approve movies for publishing',
  [MoviePermissions.REJECT]: 'Reject submitted movies',
  [MoviePermissions.PUBLISH]: 'Make movies visible to users',
  [MoviePermissions.UNPUBLISH]: 'Hide movies from users',
  [MoviePermissions.FEATURE]: 'Mark movies as featured/trending',

  [MoviePermissions.TRANSLATE]: 'Translate movie metadata',
  [MoviePermissions.UPLOAD]: 'Upload movie posters/videos',

  [MoviePermissions.VIEW_DELETED]: 'View soft-deleted movies',
  [MoviePermissions.RESTORE]: 'Restore soft-deleted movies',
  [MoviePermissions.DELETE_PERMANENT]:
    'Permanently delete movies (cannot undo)',
};
