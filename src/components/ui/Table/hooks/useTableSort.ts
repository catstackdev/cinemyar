import { useState, useMemo } from "react";

export type SortDirection = "asc" | "desc" | null;

export interface SortConfig<T> {
  key: keyof T | null;
  direction: SortDirection;
}

export interface UseTableSortReturn<T> {
  sortConfig: SortConfig<T>;
  sortedData: T[];
  requestSort: (key: keyof T) => void;
  getSortDirection: (key: keyof T) => SortDirection;
}

export function useTableSort<T>(
  data: T[],
  defaultSortKey?: keyof T,
  defaultSortDirection: SortDirection = "asc"
): UseTableSortReturn<T> {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    key: defaultSortKey || null,
    direction: defaultSortKey ? defaultSortDirection : null,
  });

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  const requestSort = (key: keyof T) => {
    let direction: SortDirection = "asc";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }

    setSortConfig({ key: direction ? key : null, direction });
  };

  const getSortDirection = (key: keyof T): SortDirection => {
    return sortConfig.key === key ? sortConfig.direction : null;
  };

  return {
    sortConfig,
    sortedData,
    requestSort,
    getSortDirection,
  };
}
