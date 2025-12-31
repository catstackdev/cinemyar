import type {
  BasePaginationParams,
  EntityType,
  PaginatedResponse,
} from "@/shared/types";

export interface AdminAssignRolePayload {
  roleIds: string[];
}

export interface AdminRoleDetailParams extends BasePaginationParams {
  sortBy?: "email" | "createdAt" | "username";
}

export interface AdminRoleDetailResponseData extends PaginatedResponse<AssignedUser> {
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
