// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/permission/permission.types.ts
// Generated: 2025-12-31T07:58:14.426Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

export interface PermissionAction {
  key: string;
  label: string;
  description: string;
  danger?: boolean; // Show warning in UI
  superAdminOnly?: boolean; // Only SUPER_ADMIN can assign
  /** * Array of keys that MUST be enabled for this to work.
   * e.g., 'movie.edit' requires ['movie.view']
   */
  dependencies?: string[];
  /** Categorize actions within an entity (e.g., "Read", "Write", "Publishing") */
  uiGroup?: 'view' | 'modify' | 'status' | 'danger';
}

export interface PermissionEntity {
  entity: string;
  label: string;
  description: string;
  /** Used for the "Indicator Preview" in your UI (e.g., "M" for Movie) */
  shortCode: string;
  actions: PermissionAction[];
  icon: string; // String name of the Lucide icon
}
export interface PermissionGroup {
  label: string;
  description: string;
  entities: string[];
  restricted?: boolean;
}

export type PermissionGroups = Record<string, PermissionGroup>;

export interface RoleTemplate {
  name: string;
  displayName: string;
  description: string;
  permissions: string[]; // Supports explicit keys or wildcards like 'movie.*'
}

export type RoleTemplates = Record<string, RoleTemplate>;

export interface PermissionResponseData {
  permissions: Record<string, PermissionEntity>;
  groups: PermissionGroups;
  dependencies: Record<string, string[]>;
  templates: RoleTemplates;
}

// dependencies: PERMISSION_DEPENDENCIES,
// templates: ROLE_TEMPLATES,
