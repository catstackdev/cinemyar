// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/role/role-admin.types.ts
// Generated: 2025-12-22T11:37:56.577Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import type { PaginatedResponse } from '../api-response.types';

/**
 * Admin Role Detail (with assigned users)
 */
export interface AdminRoleDetail {
  id: string;
  name: string;
  displayName: string;
  description: string | null;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string | null;
  users: AdminRoleUser[];
  userCount: number;
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
