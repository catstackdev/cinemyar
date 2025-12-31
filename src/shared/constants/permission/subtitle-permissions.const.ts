// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/permission/subtitle-permissions.const.ts
// Generated: 2025-12-31T07:58:14.420Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * Subtitle Permissions Helper
 *
 * Centralized subtitle permissions for all subtitle-related operations
 * Use these constants in controllers instead of hardcoding permission strings
 */

// ==========================================
// SUBTITLE PERMISSION CONSTANTS
// ==========================================

export const SubtitlePermissions = {
  // Basic CRUD
  VIEW: 'subtitle.view',
  CREATE: 'subtitle.create',
  EDIT: 'subtitle.edit',
  DELETE: 'subtitle.delete',
  AUDIT: 'subtitle.audit',
} as const;

// Type export for TypeScript
export type SubtitlePermission =
  (typeof SubtitlePermissions)[keyof typeof SubtitlePermissions];

// ==========================================
// SUBTITLE PERMISSION GROUPS
// ==========================================

/**
 * Permission groups for quick role assignment
 */
export const SubtitlePermissionGroups = {
  // Viewer - Read-only access
  VIEWER: [SubtitlePermissions.VIEW] as string[],

  // Editor - Can create and edit subtitles
  EDITOR: [
    SubtitlePermissions.VIEW,
    SubtitlePermissions.CREATE,
    SubtitlePermissions.EDIT,
  ] as string[],

  // Admin - Full control
  ADMIN: [
    SubtitlePermissions.VIEW,
    SubtitlePermissions.CREATE,
    SubtitlePermissions.EDIT,
    SubtitlePermissions.DELETE,
  ] as string[],
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Check if user has all required subtitle permissions
 */
export function hasSubtitlePermissions(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  return requiredPermissions.every((perm) => userPermissions.includes(perm));
}

/**
 * Check if user has any of the subtitle permissions
 */
export function hasAnySubtitlePermission(
  userPermissions: string[],
  permissions: string[],
): boolean {
  return permissions.some((perm) => userPermissions.includes(perm));
}

/**
 * Get subtitle permissions for a specific role
 */
export function getSubtitlePermissionsForRole(
  role: 'VIEWER' | 'EDITOR' | 'ADMIN',
): string[] {
  return SubtitlePermissionGroups[role];
}

// ==========================================
// PERMISSION DESCRIPTIONS
// ==========================================

export const SubtitlePermissionDescriptions: Record<string, string> = {
  [SubtitlePermissions.VIEW]: 'View subtitle files',
  [SubtitlePermissions.CREATE]: 'Upload new subtitles',
  [SubtitlePermissions.EDIT]: 'Edit subtitle metadata',
  [SubtitlePermissions.DELETE]: 'Remove subtitles',
};
