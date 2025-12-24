import type { LoaderFunctionArgs } from "react-router-dom";
import { Time } from "@/shared/constants/time.const";
import { queryClient } from "@/contexts/AppProviders";
import { AdminRolesAPI } from "../api/admin-roles.api";
import { AdminAllRolesQueryKey } from "../api/roles-query-key";
import type { AllAdminRoleParams } from "@/shared/types/role";

export const allRolesLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const params: AllAdminRoleParams = {
    search: url.searchParams.get("search") || undefined,
    sortBy:
      (url.searchParams.get("sortBy") as AllAdminRoleParams["sortBy"]) ||
      undefined,
    orderBy:
      (url.searchParams.get("orderBy") as AllAdminRoleParams["orderBy"]) ||
      undefined,
    page: Number(url.searchParams.get("page") || "1"),
    limit: Number(url.searchParams.get("limit") || "10"),
    entity:
      (url.searchParams.get("entity") as AllAdminRoleParams["entity"]) ||
      undefined,
  };

  const queryKey = AdminAllRolesQueryKey(params);
  return queryClient.ensureQueryData({
    queryKey,
    queryFn: () => AdminRolesAPI.getRoles(params),
    staleTime: 5 * Time.MINUTE,
    // keepPreviousData: true, // optional, smooth pagination
  });
};
