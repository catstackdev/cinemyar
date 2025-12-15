import React, { useMemo } from "react";
import {
  defaultParams,
  type AdminGenresParamFilterProps,
} from "./AdminGenresParamFilter.types";
import { useGenreOption } from "@/features/domain/genres/hooks/useGenreOption";
import type { FilterGroup } from "@/components/ui/Params/ParamFilterDropdown/ParamFilterDropdown.types";
import { QueryParamFilter } from "@/components/common/queryParams";
import { cn } from "@/utils/helpers";

const AdminGenresParamFilter: React.FC<AdminGenresParamFilterProps> = ({
  children,
  className,
}) => {
  const { data: genreOptions, isLoading } = useGenreOption({
    onlyParent: true,
  });
  const filters: FilterGroup[] = useMemo(() => {
    return [
      {
        name: "status",
        title: "Parent",
        options: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ],
      },
      {
        name: "parentId",
        title: "Genre Group",
        options:
          genreOptions?.data?.map((g) => ({ label: g.name, value: g.id })) ||
          [],
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
  }, [genreOptions]);

  // if (isLoading) return <div>Loading...</div>;

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

export default AdminGenresParamFilter;
