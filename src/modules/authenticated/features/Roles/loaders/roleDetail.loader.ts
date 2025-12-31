import type { LoaderFunctionArgs } from "react-router-dom";
import { Time } from "@/shared/constants/time.const";
import { queryClient } from "@/contexts/AppProviders";
import { AdminRolesAPI } from "../api/admin-roles.api";
import { AdminRoleDetailQueryKey } from "../api/roles-query-key";
import type { AdminRoleDetailParams } from "../api/admin-roles.types";

export const roleDetailLoader = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  const roleId = params.id;
  if (!roleId) throw new Error("Role ID is required");

  const url = new URL(request.url);
  const queryParams: AdminRoleDetailParams = {
    search: url.searchParams.get("search") || undefined,
    page: Number(url.searchParams.get("page") || "1"),
    limit: Number(url.searchParams.get("limit") || "10"),
    sortBy:
      (url.searchParams.get("sortBy") as AdminRoleDetailParams["sortBy"]) ||
      undefined,
    orderBy:
      (url.searchParams.get("orderBy") as AdminRoleDetailParams["orderBy"]) ||
      undefined,
  };

  return queryClient.ensureQueryData({
    queryKey: AdminRoleDetailQueryKey(roleId, queryParams),
    queryFn: () => AdminRolesAPI.getRole(roleId, queryParams),
    staleTime: 5 * Time.MINUTE,
  });
};
