import type { AllAdminRoleParams } from "@/shared/types";
import type { AdminRoleDetailParams } from "./admin-roles.types";

export const AdminAllRolesQueryKey = (params?: AllAdminRoleParams) => [
  "admin",
  "roles",
  params,
];

export const AdminRoleDetailQueryKey = (
  id: string,
  params?: AdminRoleDetailParams,
) => ["admin", "roles", id, params] as const;

export const AdminRolesQueryKey = (id: string) => ["admin", "roles", id];

export const AdminAllRolesOptionsQueryKey = () => ["admin", "roles", "options"];
