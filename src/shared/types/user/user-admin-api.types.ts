// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/user/user-admin-api.types.ts
// Generated: 2025-12-31T07:58:14.427Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

/**
 * Admin User Management API Types
 * Types for /admin/admins endpoint (admin user CRUD operations)
 */

import type { PaginatedResponse } from '../api-response.types';
import { EntityType } from '../entity';
import type { BasePaginationParams } from '../params';

// ==========================================
// ADMIN USER ROLE FILTER
// ==========================================

/**
 * Admin role filter enum for filtering admin users
 * Only ADMIN and SUPER_ADMIN roles are shown in admin management
 */
// export type AdminRoleFilter = 'ADMIN' | 'SUPER_ADMIN';

// ==========================================
// ADMIN USER QUERY PARAMS
// ==========================================

/**
 * Query parameters for admin user list pagination
 * Used in GET /admin/admins
 */
export interface AdminUserListParams extends BasePaginationParams {
  /** Filter by ban status (true = banned only, false = non-banned only) */
  isBanned?: boolean;
  /** Sort field */
  sortBy?: 'username' | 'email' | 'createdAt' | 'isBanned';
  /** Filter by admin role ID */
  adminRoleId?: string;
  exceptAdminRoleId?: string;
}

// ==========================================
// DYNAMIC ROLE INFO
// ==========================================

/**
 * Admin role information for admin users
 */
export interface AdminRoleInfo {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  permissions: string[];
}

/**
 * User-Role junction info
 */
export interface UserAdminRoleInfo {
  roleId: string;
  userId: string;
  assignedAt: Date | string;
  role: AdminRoleInfo;
}

// ==========================================
// ADMIN USER RESPONSE TYPES
// ==========================================

/**
 * Admin user item in list view
 * Lightweight version without full details
 */
export interface AdminUserListItem {
  id: string;
  email: string | null;
  username: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  isEmailVerified: boolean;
  isBanned: boolean;
  bannedAt: string | null;
  bannedReason: string | null;
  createdAt: string;
  updatedAt: string;
  /** Assigned admin roles with full role info */
  adminRoles: UserAdminRoleInfo[];
  /** Counts for related entities */
  _count: {
    deviceSessions: number;
    adminRoles: number;
  };
  permissions: string[];
}

/**
 * Paginated response for admin user list
 * GET /admin/admins response type
 */
export type AdminUserListResponse = PaginatedResponse<AdminUserListItem>;

// ==========================================
// ADMIN USER DETAIL TYPES
// ==========================================

/**
 * Device session info for admin user
 */
export interface AdminUserDeviceSession {
  id: string;
  deviceName: string;
  deviceType: string;
  ipAddress: string;
  userAgent: string;
  isActive: boolean;
  lastActiveAt: string;
  createdAt: string;
}

/**
 * Full admin user details
 * GET /admin/admins/:id response type
 */
export interface AdminUserDetail {
  id: string;
  email: string | null;
  username: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  isEmailVerified: boolean;
  isBanned: boolean;
  bannedAt: string | null;
  bannedReason: string | null;
  bannedBy: string | null;
  createdAt: string;
  updatedAt: string;
  /** Assigned admin roles with full role info */
  adminRoles: UserAdminRoleInfo[];
  /** Active device sessions */
  deviceSessions?: AdminUserDeviceSession[];
  /** Counts for related entities */
  _count: {
    deviceSessions: number;
    adminRoles: number;
  };
}

// ==========================================
// ADMIN USER UPDATE TYPES
// ==========================================

/**
 * Update admin user payload
 * PATCH /admin/admins/:id request body
 */
export interface UpdateAdminUserDto {
  email?: string;
  username?: string;
  /** Only SUPER_ADMIN can change role */
  role?: 'ADMIN' | 'SUPER_ADMIN';
  /** Update email verification status */
  isEmailVerified?: boolean;
}

/**
 * Update admin user response
 * PATCH /admin/admins/:id response type
 */
export interface UpdateAdminUserResponse {
  success: boolean;
  data: AdminUserDetail;
  message?: string;
}

// ==========================================
// BAN/UNBAN TYPES
// ==========================================

/**
 * Ban admin user payload
 * POST /admin/admins/:id/ban request body
 */
export interface BanAdminUserDto {
  /** Reason for banning the admin user */
  reason: string;
}

/**
 * Ban admin user response
 * POST /admin/admins/:id/ban response type
 */
export interface BanAdminUserResponse {
  success: boolean;
  data: {
    id: string;
    username: string;
    isBanned: boolean;
    bannedAt: string;
    bannedReason: string;
    bannedBy: string;
    /** Number of device sessions revoked (force logout) */
    sessionsRevoked: number;
  };
}

/**
 * Unban admin user response
 * POST /admin/admins/:id/unban response type
 */
export interface UnbanAdminUserResponse {
  success: boolean;
  data: {
    id: string;
    username: string;
    isBanned: boolean;
    bannedAt: null;
    bannedReason: null;
    bannedBy: null;
  };
}

// ==========================================
// SESSION MANAGEMENT TYPES
// ==========================================

/**
 * Admin user sessions list response
 * GET /admin/admins/:id/sessions response type
 */
export interface AdminUserSessionsResponse {
  success: boolean;
  data: AdminUserDeviceSession[];
}

/**
 * Revoke admin session response
 * DELETE /admin/admins/:userId/sessions/:sessionId response type
 */
export interface RevokeAdminSessionResponse {
  success: boolean;
  message: string;
}

// ==========================================
// ACTIVITY LOG TYPES
// ==========================================

/**
 * Activity log item for admin user
 */
export interface AdminUserActivityLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  metadata: Record<string, any> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

/**
 * Admin user activity logs response
 * GET /admin/admins/:id/activity response type
 */
export type AdminUserActivityResponse = PaginatedResponse<AdminUserActivityLog>;

// ==========================================
// ERROR TYPES
// ==========================================

/**
 * Admin user API error codes
 */
export enum AdminUserApiError {
  ADMIN_NOT_FOUND = 'ADMIN_NOT_FOUND',
  EMAIL_ALREADY_TAKEN = 'EMAIL_ALREADY_TAKEN',
  CANNOT_BAN_SUPER_ADMIN = 'CANNOT_BAN_SUPER_ADMIN',
  ALREADY_BANNED = 'ALREADY_BANNED',
  NOT_BANNED = 'NOT_BANNED',
  SESSION_NOT_FOUND = 'SESSION_NOT_FOUND',
  FORBIDDEN = 'FORBIDDEN',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
}
