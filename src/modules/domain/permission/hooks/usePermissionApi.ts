import { useQuery } from "@tanstack/react-query";
import { AdminPermissonQueryKey } from "../api/permission.query.key";
import { AdminPermissionAPI } from "../api/permission.api";

export const usePermissionApi = (options?: { enabled?: boolean }) => {
  const queryKey = AdminPermissonQueryKey();
  return useQuery({
    queryKey: queryKey,
    queryFn: () => AdminPermissionAPI.getPermissions(),
    ...options,
    staleTime: Infinity,
  });
};
