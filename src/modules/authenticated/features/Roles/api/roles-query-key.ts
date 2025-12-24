import type { AllAdminRoleParams } from "@/shared/types";

export const AdminAllRolesQueryKey = (params?: AllAdminRoleParams) => [
  "admin",
  "roles",
  params,
];
export const AdminRolesQueryKey = (id: string) => ["admin", "roles", id];

export const AdminAllRolesOptionsQueryKey = () => ["admin", "roles", "options"];
