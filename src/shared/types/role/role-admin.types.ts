// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/role/role-admin.types.ts
// Generated: 2025-12-31T15:40:29.228Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import type { PaginatedResponse } from '../api-response.types';

/**
 * Admin Role Detail (with assigned users)
 */
export interface AdminRoleDetailResponseData
  extends PaginatedResponse<AssignedUser> {
  role: Role;
}

export interface Role {
  id: string;
  name: string;
  displayName: string;
  description: string | null;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
}

export interface AssignedUser {
  id: string;
  email: string;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  assignedAt: string;
  assignedBy: string | null;
}

/**
 * Role User Assignment
 */
export interface AdminRoleUser {
  userId: string;
  user: {
    id: string;
    email: string;
    username: string;
    role: string;
  };
  assignedAt: Date;
  assignedBy: string;
}

/**
 * Admin Role List Item (without users, just count)
 */
export interface AdminRole {
  id: string;
  name: string;
  displayName: string;
  description: string | null;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string | null;
  userCount: number;
}

/**
 * Paginated Role Response
 */
export type AdminRolesPaginatedResponse = PaginatedResponse<AdminRole>;

/**
 * Role Option Item (for dropdowns/select inputs)
 * Lightweight version with only essential fields
 */
export interface AdminRoleOption {
  id: string;
  name: string;
  displayName: string;
  description: string | null;
}

/**
 * Role Options Response
 * GET /admin/roles/options
 */
export type AdminRoleOptionsResponse = AdminRoleOption[];
