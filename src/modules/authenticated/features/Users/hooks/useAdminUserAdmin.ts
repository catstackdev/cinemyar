import { Time } from "@/shared/constants";
import type { AdminUserListParams } from "@/shared/types/user";
import { useQuery } from "@tanstack/react-query";
import { AdminUserAdminsQueryKey, AdminUserAdminsApi } from "../api";

export const useAdminUserAdmins = (params?: AdminUserListParams) => {
  const queryKey = AdminUserAdminsQueryKey(params);
  return useQuery({
    queryKey: queryKey,
    queryFn: () => AdminUserAdminsApi.getUserAdmins(params),
    staleTime: 5 * Time.MINUTE,
  });
};
