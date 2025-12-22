// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/permission/permission.types.ts
// Generated: 2025-12-22T11:37:56.576Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

export interface PermissionAction {
  key: string;
  label: string;
  description: string;
  danger?: boolean; // Show warning in UI
  superAdminOnly?: boolean; // Only SUPER_ADMIN can assign
}

export interface PermissionEntity {
  entity: string;
  label: string;
  actions: PermissionAction[];
}

export type PermissionResponseData = Record<string, PermissionEntity>;
