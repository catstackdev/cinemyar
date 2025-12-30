// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/permission/actor-permissions.const.ts
// Generated: 2025-12-30T04:21:52.058Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * Actor Permissions Helper
 *
 * Centralized actor permissions for all actor-related operations
 * Use these constants in controllers instead of hardcoding permission strings
 */

// ==========================================
// ACTOR PERMISSION CONSTANTS
// ==========================================

export const ActorPermissions = {
  // Basic CRUD
  VIEW: 'actor.view',
  CREATE: 'actor.create',
  EDIT: 'actor.edit',
  DELETE: 'actor.delete',

  // Media Management
  UPLOAD: 'actor.upload',
} as const;

// Type export for TypeScript
export type ActorPermission =
  (typeof ActorPermissions)[keyof typeof ActorPermissions];

// ==========================================
// ACTOR PERMISSION GROUPS
// ==========================================

/**
 * Permission groups for quick role assignment
 */
export const ActorPermissionGroups = {
  // Viewer - Read-only access
  VIEWER: [ActorPermissions.VIEW] as string[],

  // Editor - Can create and edit actors
  EDITOR: [
    ActorPermissions.VIEW,
    ActorPermissions.CREATE,
    ActorPermissions.EDIT,
  ] as string[],

  // Content Manager - Can upload photos
  CONTENT_MANAGER: [
    ActorPermissions.VIEW,
    ActorPermissions.CREATE,
    ActorPermissions.EDIT,
    ActorPermissions.UPLOAD,
  ] as string[],

  // Admin - Full control
  ADMIN: [
    ActorPermissions.VIEW,
    ActorPermissions.CREATE,
    ActorPermissions.EDIT,
    ActorPermissions.DELETE,
    ActorPermissions.UPLOAD,
  ] as string[],
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Check if user has all required actor permissions
 */
export function hasActorPermissions(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  return requiredPermissions.every((perm) => userPermissions.includes(perm));
}

/**
 * Check if user has any of the actor permissions
 */
export function hasAnyActorPermission(
  userPermissions: string[],
  permissions: string[],
): boolean {
  return permissions.some((perm) => userPermissions.includes(perm));
}

/**
 * Get actor permissions for a specific role
 */
export function getActorPermissionsForRole(
  role: 'VIEWER' | 'EDITOR' | 'CONTENT_MANAGER' | 'ADMIN',
): string[] {
  return ActorPermissionGroups[role];
}

// ==========================================
// PERMISSION DESCRIPTIONS
// ==========================================

export const ActorPermissionDescriptions: Record<string, string> = {
  [ActorPermissions.VIEW]: 'View actor list and profiles',
  [ActorPermissions.CREATE]: 'Add new actors',
  [ActorPermissions.EDIT]: 'Edit actor profiles',
  [ActorPermissions.DELETE]: 'Remove actors',
  [ActorPermissions.UPLOAD]: 'Upload actor photos',
};
