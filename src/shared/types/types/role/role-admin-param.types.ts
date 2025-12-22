// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/role/role-admin-param.types.ts
// Generated: 2025-12-22T11:37:56.577Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import type { EntityType } from '../entity';
import type { OrderParams } from '../params';

export interface AllAdminRoleParams {
  entity?: EntityType;
  search?: string; //Search by name, displayName, or description
  sortBy?: 'name' | 'createdAt' | 'updatedAt' | 'displayName';
  orderBy?: OrderParams;
  page?: number; // Default: 1
  limit?: number; // Default: 10
}
