import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/utils/helpers/classNames";
import {
  defaultParams,
  type AdminUserAdminsFilterProps,
} from "./AdminUserAdminsFilter.types";
import { QueryParamFilter } from "@/components/common/queryParams";
import type { FilterGroup } from "@/components/ui/Params/ParamFilterDropdown/ParamFilterDropdown.types";
import { useAdminRoleOptions } from "@/modules/authenticated/features/Roles/hooks/useAdminRoles";
import { useCan } from "@/hooks";
import { PermissionPermissions } from "@/shared/constants";
import { OrderOptions } from "@/consts/order.const";

const AdminUserAdminsFilter: React.FC<AdminUserAdminsFilterProps> = ({
  children,
  className,
}) => {
  const canPermissionView = useCan({
    roles: ["ADMIN"],
    permissions: PermissionPermissions.VIEW,
  });

  const { data: Options, isLoading } = useAdminRoleOptions({
    enabled: canPermissionView,
  });

  // Get current filter values from URL
  const [searchParams] = useSearchParams();
  const selectedIncludeId = searchParams.get("dynamicRoleId");
  const selectedExcludeId = searchParams.get("exceptdynamicRoleId");

  const filters: FilterGroup[] = useMemo(() => {
    // Base options from API
    const baseOptions =
      Options?.data?.map((g) => ({
        label: g.displayName,
        value: g.id,
      })) || [];

    return [
      ...(canPermissionView
        ? [
            {
              name: "dynamicRoleId",
              title: "Dynamic Role",
              loading: isLoading,
              options: [
                { label: "All Roles", value: undefined },
                // Filter out the role selected in "Except Dynamic Role"
                ...baseOptions.filter(
                  (opt) => opt.value !== selectedExcludeId,
                ),
              ],
            },
            {
              name: "exceptdynamicRoleId",
              title: "Except Dynamic Role",
              loading: isLoading,
              options: [
                { label: "All Roles", value: undefined },
                // Filter out the role selected in "Dynamic Role"
                ...baseOptions.filter(
                  (opt) => opt.value !== selectedIncludeId,
                ),
              ],
            },
          ]
        : []),
      {
        name: "sortBy",
        title: "Sort By",
        options: [
          { label: "Default", value: undefined, default: true },
          { label: "Username", value: "username" },
          { label: "Email", value: "email" },
          { label: "Created At", value: "createdAt" },
          { label: "Is Banned", value: "isBanned" },
        ],
      },
      {
        name: "isBanned",
        title: "Ban Status",
        options: [
          { label: "All", value: undefined },
          { label: "Banned", value: "true" },
          { label: "Not Banned", value: "false" },
        ],
      },
      {
        name: "orderBy",
        title: "Order By",
        notShowChip: true,
        options: OrderOptions,
      },
    ];
  }, [Options, isLoading, canPermissionView, selectedIncludeId, selectedExcludeId]);

  return (
    <QueryParamFilter
      filters={filters}
      className={cn("w-full", className)}
      loading={isLoading}
      defaultParams={defaultParams}
    >
      {children}
    </QueryParamFilter>
  );
};

export default AdminUserAdminsFilter;
