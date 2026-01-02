// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/role/role-detail.types.ts
// Generated: 2025-12-31T15:40:29.228Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import type { PaginatedResponse } from '../api-response.types';

export interface Role {
  id: string;
  name: string;
  displayName: string;
  description: string | null;
  permissions: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  createdBy: string | null;
}

export interface RoleUser {
  id: string;
  email: string;
  username: string;
  role: string; // e.g., "ADMIN"
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  assignedAt: string; // ISO date string
  assignedBy: string | null;
}
export interface RoleWithUsers {
  role: Role;
  users: RoleUser[];
}
export type PaginatedRolesResponse = PaginatedResponse<RoleWithUsers>;
