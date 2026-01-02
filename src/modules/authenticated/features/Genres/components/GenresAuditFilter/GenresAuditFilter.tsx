import React, { useMemo } from "react";
import { cn } from "@/utils/helpers/classNames";
import type { GenresAuditFilterProps } from "./GenresAuditFilter.types";
import type { FilterGroup } from "@/components/ui/Params/ParamFilterDropdown/ParamFilterDropdown.types";
import { QueryParamFilter } from "@/components/common/queryParams";
import { defaultParams } from "../AdminGenresParamFilter/AdminGenresParamFilter.types";

const GenresAuditFilter: React.FC<GenresAuditFilterProps> = ({
  filters,
  isLoading,
  children,
  className,
}) => {
  const updateFilters: FilterGroup[] = useMemo(() => {
    return [
      {
        name: "userId",
        title: "By User",
        options:
          filters?.users?.map((u) => ({
            label: u?.username?.toString(),
            value: u?.id?.toString(),
          })) || [],
      },
      {
        name: "action",
        title: "Actions",
        options: filters?.actions?.map((u) => ({ label: u, value: u })) || [],
      },
      {
        name: "orderBy",
        title: "Order By",
        notShowChip: true,
        options: [
          { label: "Ascending", value: "asc" },
          { label: "Descending", value: "desc" },
        ],
      },
    ];
  }, [filters]);

  return (
    <QueryParamFilter
      filters={updateFilters}
      className={cn("w-full", className)}
      defaultParams={defaultParams}
      loading={isLoading}
    >
      {children}
    </QueryParamFilter>
  );
};

export default GenresAuditFilter;
