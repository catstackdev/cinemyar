// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/permission/video-source-permissions.const.ts
// Generated: 2025-12-31T07:58:14.420Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * Video Source Permissions Helper
 *
 * Centralized video source permissions for all video source operations
 * Use these constants in controllers instead of hardcoding permission strings
 */

// ==========================================
// VIDEO SOURCE PERMISSION CONSTANTS
// ==========================================

export const VideoSourcePermissions = {
  // Basic CRUD
  VIEW: 'video_source.view',
  CREATE: 'video_source.create',
  EDIT: 'video_source.edit',
  DELETE: 'video_source.delete',
} as const;

// Type export for TypeScript
export type VideoSourcePermission =
  (typeof VideoSourcePermissions)[keyof typeof VideoSourcePermissions];

// ==========================================
// VIDEO SOURCE PERMISSION GROUPS
// ==========================================

/**
 * Permission groups for quick role assignment
 */
export const VideoSourcePermissionGroups = {
  // Viewer - Read-only access
  VIEWER: [VideoSourcePermissions.VIEW] as string[],

  // Editor - Can create and edit video sources
  EDITOR: [
    VideoSourcePermissions.VIEW,
    VideoSourcePermissions.CREATE,
    VideoSourcePermissions.EDIT,
  ] as string[],

  // Admin - Full control
  ADMIN: [
    VideoSourcePermissions.VIEW,
    VideoSourcePermissions.CREATE,
    VideoSourcePermissions.EDIT,
    VideoSourcePermissions.DELETE,
  ] as string[],
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Check if user has all required video source permissions
 */
export function hasVideoSourcePermissions(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  return requiredPermissions.every((perm) => userPermissions.includes(perm));
}

/**
 * Check if user has any of the video source permissions
 */
export function hasAnyVideoSourcePermission(
  userPermissions: string[],
  permissions: string[],
): boolean {
  return permissions.some((perm) => userPermissions.includes(perm));
}

/**
 * Get video source permissions for a specific role
 */
export function getVideoSourcePermissionsForRole(
  role: 'VIEWER' | 'EDITOR' | 'ADMIN',
): string[] {
  return VideoSourcePermissionGroups[role];
}

// ==========================================
// PERMISSION DESCRIPTIONS
// ==========================================

export const VideoSourcePermissionDescriptions: Record<string, string> = {
  [VideoSourcePermissions.VIEW]: 'View video sources',
  [VideoSourcePermissions.CREATE]: 'Add video quality sources',
  [VideoSourcePermissions.EDIT]: 'Edit video sources',
  [VideoSourcePermissions.DELETE]: 'Remove video sources',
};
