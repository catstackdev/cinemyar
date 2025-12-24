// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/types/role/role-admin-param.types.ts
// Generated: 2025-12-23T11:53:07.631Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

import type { EntityType } from '../entity';
import type { BasePaginationParams } from '../params';

export interface AllAdminRoleParams extends BasePaginationParams {
  entity?: EntityType;
  sortBy?: 'name' | 'createdAt' | 'updatedAt' | 'displayName';
}
