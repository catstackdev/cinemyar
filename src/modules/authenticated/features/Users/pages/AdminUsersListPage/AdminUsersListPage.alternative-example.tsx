/**
 * ALTERNATIVE IMPLEMENTATION using useAppQueryParams instead of useCrudPage
 * 
 * This file demonstrates how you COULD refactor AdminUsersListPage to use
 * useAppQueryParams directly. However, the current useCrudPage approach is
 * RECOMMENDED because it's more comprehensive.
 * 
 * DO NOT import this file - it's for reference only.
 */

import { useQuery } from "@tanstack/react-query";
import { useAppQueryParams } from "@/hooks";
import { useTableSortParams } from "@/components/ui/Table";
import type { AdminUserListParams, AdminUserListItem } from "@/shared/types";
import { AdminUserAdminsQueryKey, AdminUserAdminsApi } from "../../api";

interface AdminUserListParamsExtended extends Record<string, unknown>, AdminUserListParams {}

function AdminUsersListPageAlternative() {
  // Option 1: Use useAppQueryParams for query param management
  const { params, setParams } = useAppQueryParams<AdminUserListParamsExtended>({
    defaultParams: {
      orderBy: "asc",
      page: 1,
      limit: 10,
      search: undefined,
      sortBy: "username",
      dynamicRoleId: undefined,
      isBanned: undefined,
    },
    parseParams: (searchParams) => {
      const isBannedParam = searchParams.get("isBanned");
      return {
        search: searchParams.get("search") || undefined,
        parentId: searchParams.get("parentId") || undefined,
        sortBy:
          (searchParams.get("sortBy") as AdminUserListParams["sortBy"]) ||
          "username",
        orderBy:
          (searchParams.get("orderBy") as AdminUserListParams["orderBy"]) ||
          "asc",
        page: Number(searchParams.get("page") || "1"),
        limit: Number(searchParams.get("limit") || "10"),
        isBanned:
          isBannedParam === "true"
            ? true
            : isBannedParam === "false"
              ? false
              : undefined,
        dynamicRoleId: searchParams.get("dynamicRoleId") || undefined,
        exceptdynamicRoleId: searchParams.get("exceptdynamicRoleId") || undefined,
      };
    },
  });

  // You'd need to handle sorting separately
  const { requestSort, getSortDirection } = useTableSortParams({
    defaultSortBy: "username",
    defaultOrderBy: "asc",
  });

  // You'd need to handle data fetching separately
  const { data: response, isLoading } = useQuery({
    queryKey: AdminUserAdminsQueryKey(params),
    queryFn: () => AdminUserAdminsApi.getUserAdmins(params),
  });

  const data = response?.data?.data ?? [];
  const pagination = response?.data?.meta ?? {
    total: 0,
    page: params.page,
    limit: params.limit,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };

  // Pagination handler
  const handlePageChange = (page: number) => {
    setParams({ page });
  };

  // Benefits of this approach:
  // 1. More explicit control over params
  // 2. params.page is typed as number (not number | undefined)
  // 3. Can use setParams, resetParams, updateParams, etc.
  // 4. Easier to add custom param logic

  // Drawbacks:
  // 1. More boilerplate (need to set up sorting, fetching separately)
  // 2. useCrudPage already does all of this for you

  return null; // JSX would be the same
}

/**
 * RECOMMENDATION:
 * 
 * Stick with useCrudPage for CRUD list pages because it:
 * - Handles params, sorting, pagination, and fetching in one hook
 * - Reduces boilerplate
 * - Is designed specifically for this use case
 * 
 * Use useAppQueryParams when:
 * - You need query params but NOT in a CRUD page
 * - You want to read params without fetching data
 * - You need custom param management logic
 * - You're building a search page, filter page, etc. (not a CRUD table)
 */
