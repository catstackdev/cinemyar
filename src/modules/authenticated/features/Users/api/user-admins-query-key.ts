import type { AdminUserListParams } from "@/shared/types/user";

export const AdminUserAdminsQueryKey = (params?: AdminUserListParams) => [
  "admin",
  "users",
  "admins",
  params,
];
export const AdminUserAdminsQueryKeyById = (id: string) => [
  "admin",
  "users",
  "admins",
  id,
];
