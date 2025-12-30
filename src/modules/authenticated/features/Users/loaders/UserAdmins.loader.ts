import { Time } from "@/shared/constants";
import type { AdminUserListParams } from "@/shared/types/user";
import { AdminUserAdminsQueryKey, AdminUserAdminsApi } from "../api";
import { queryClient } from "@/contexts/AppProviders";
import type { LoaderFunctionArgs } from "react-router-dom";

export const allUserAdminLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const params: AdminUserListParams = {
    search: url.searchParams.get("search") || undefined,
    sortBy:
      (url.searchParams.get("sortBy") as AdminUserListParams["sortBy"]) ||
      undefined,
    orderBy:
      (url.searchParams.get("orderBy") as AdminUserListParams["orderBy"]) ||
      undefined,
    page: Number(url.searchParams.get("page") || "1"),
    limit: Number(url.searchParams.get("limit") || "10"),
    isBanned: url.searchParams.get("isBanned") || undefined,
    dynamicRoleId: url.searchParams.get("dynamicRoleId") || undefined,
    exceptdynamicRoleId:
      url.searchParams.get("exceptdynamicRoleId") || undefined,
  };

  const queryKey = AdminUserAdminsQueryKey(params);
  return queryClient.ensureQueryData({
    queryKey,
    queryFn: () => AdminUserAdminsApi.getUserAdmins(params),
    staleTime: 5 * Time.MINUTE,
    // keepPreviousData: true, // optional, smooth pagination
  });
};
