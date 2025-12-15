import React, { useMemo } from "react";
import type { QueryParamFilterProps } from "./QueryParamFilter.types";
import { ParamFilterDropdown } from "@/components/ui/Params";
import { useSearchParams } from "react-router-dom";

const QueryParamFilter: React.FC<QueryParamFilterProps> = ({
  children,
  filters,
  className,
  loading,
  defaultParams = {},
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. READ: Derive state from URL
  const selectedValues = useMemo(() => {
    const current: Record<string, string> = defaultParams ?? {};
    filters.forEach((group) => {
      const value = searchParams.get(group.name);
      if (value) current[group.name] = value;
    });
    return current;
  }, [searchParams, filters, defaultParams]);

  // 2. WRITE: Update URL
  const handleFilterChange = (
    newValues: Record<string, string | undefined>,
  ) => {
    // console.log("newValues form b", newValues);
    setSearchParams((prevParams) => {
      Object.entries(newValues).forEach(([key, value]) => {
        if (value) {
          prevParams.set(key, value);
        } else {
          delete selectedValues[key];
          prevParams.delete(key);
        }
      });
      return prevParams;
    });
  };

  return (
    <ParamFilterDropdown
      className={className}
      filters={filters}
      selectedValues={selectedValues}
      onFilterChange={handleFilterChange}
      loading={loading}
    >
      {children}
    </ParamFilterDropdown>
  );
};

export default QueryParamFilter;
