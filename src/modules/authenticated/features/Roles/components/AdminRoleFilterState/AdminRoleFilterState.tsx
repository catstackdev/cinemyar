import React, { useMemo } from "react";
import type { AdminRoleFilterStateProps } from "./AdminRoleFilterState.types";
import { StateFilter } from "@/components/common/state";
import type { FilterGroup } from "@/components/ui/Params/ParamFilterDropdown/ParamFilterDropdown.types";
import { useAdminRoleOptions } from "../../hooks/useAdminRoles";
import { OrderOptions } from "@/consts/order.const";

const AdminRoleFilterState: React.FC<AdminRoleFilterStateProps> = ({
  children,
  onFilterChange,
  defaultValues,
  exceptdynamicRoleId,
}) => {
  // Fetch role options for filters
  const { data: roleOptions, isLoading: rolesLoading } = useAdminRoleOptions();
  const defaultRoleOptions = useMemo(() => {
    if (!roleOptions?.data) return [];

    console.log("defaultRoleOptions", exceptdynamicRoleId);
    return roleOptions.data
      .filter((role) => role.id != exceptdynamicRoleId) // 👈 exclude this id
      .map((role) => ({
        label: role.displayName,
        value: role.id,
      }));
  }, [roleOptions?.data, exceptdynamicRoleId]);

  const filters: FilterGroup[] = useMemo(() => {
    return [
      // {
      //   name: "dynamicRoleId",
      //   title: "Has Role",
      //   options: [
      //     { label: "All", value: undefined },
      //     ...(roleOptions?.data?.map((role) => ({
      //       label: role.displayName,
      //       value: role.id,
      //     })) || []),
      //   ],
      //   loading: rolesLoading,
      // },
      {
        name: "dynamicRoleId",
        title: "Role",
        options: [{ label: "All", value: undefined }, ...defaultRoleOptions],
        loading: rolesLoading,
      },
      {
        name: "sortBy",
        title: "Sort By",
        options: [
          { label: "Default", value: undefined },
          { label: "Username", value: "username" },
          { label: "Email", value: "email" },
          { label: "Created At", value: "createdAt" },
          { label: "Updated At", value: "updatedAt" },
        ],
      },
      {
        name: "orderBy",
        title: "Order By",
        notShowChip: true,
        options: OrderOptions,
      },
      // {
      //   name: "isBanned",
      //   title: "Ban Status",
      //   options: [
      //     { label: "All", value: undefined },
      //     { label: "Banned", value: "true" },
      //     { label: "Not Banned", value: "false" },
      //   ],
      // },
      // {
      //   name: "exceptAdminRoleId",
      //   title: "Exclude Role",
      //   options: [
      //     { label: "None", value: undefined },
      //     ...(roleOptions?.data?.map((role) => ({
      //       label: role.displayName,
      //       value: role.id,
      //     })) || []),
      //   ],
      //   loading: rolesLoading,
      // },
    ];
  }, [roleOptions, rolesLoading]);

  return (
    <StateFilter
      filters={filters}
      zIndex={1000}
      onFilterChange={onFilterChange}
      defaultValues={defaultValues}
    >
      {children}
    </StateFilter>
  );
};

export default AdminRoleFilterState;
