import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { SortDirection } from "./useTableSort";

export interface UseTableSortParamsOptions {
  /**
   * Default sort key (column name)
   */
  defaultSortBy?: string;
  
  /**
   * Default sort direction
   * @default "asc"
   */
  defaultOrderBy?: "asc" | "desc";
  
  /**
   * URL param name for sort column
   * @default "sortBy"
   */
  sortByParam?: string;
  
  /**
   * URL param name for sort direction
   * @default "orderBy"
   */
  orderByParam?: string;
  
  /**
   * Whether to replace the current history entry instead of pushing a new one
   * @default true
   */
  replace?: boolean;
}

export interface UseTableSortParamsReturn {
  /**
   * Current sort column from URL params
   */
  sortBy: string | null;
  
  /**
   * Current sort direction from URL params
   */
  orderBy: "asc" | "desc" | null;
  
  /**
   * Request sort on a column - updates URL params
   * Cycles through: asc -> desc -> null
   */
  requestSort: (column: string) => void;
  
  /**
   * Get the sort direction for a specific column
   * Returns null if column is not currently sorted
   */
  getSortDirection: (column: string) => SortDirection;
}

/**
 * Hook for managing table sorting via URL search params
 * Updates URL params instead of local state for shareable/bookmarkable sorting
 * 
 * @example
 * ```tsx
 * const { sortBy, orderBy, requestSort, getSortDirection } = useTableSortParams({
 *   defaultSortBy: 'name',
 *   defaultOrderBy: 'asc',
 * });
 * 
 * // In table header
 * <TableSortableHead
 *   sortDirection={getSortDirection('name')}
 *   onSort={() => requestSort('name')}
 * >
 *   Name
 * </TableSortableHead>
 * ```
 */
export function useTableSortParams(
  options: UseTableSortParamsOptions = {}
): UseTableSortParamsReturn {
  const {
    defaultSortBy,
    defaultOrderBy = "asc",
    sortByParam = "sortBy",
    orderByParam = "orderBy",
    replace = true,
  } = options;

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = useMemo(() => {
    return searchParams.get(sortByParam) || defaultSortBy || null;
  }, [searchParams, sortByParam, defaultSortBy]);

  const orderBy = useMemo(() => {
    const order = searchParams.get(orderByParam);
    if (order === "asc" || order === "desc") {
      return order;
    }
    return sortBy ? defaultOrderBy : null;
  }, [searchParams, orderByParam, sortBy, defaultOrderBy]);

  const requestSort = useCallback(
    (column: string) => {
      const newParams = new URLSearchParams(searchParams);
      
      let newDirection: "asc" | "desc" | null = "asc";

      // If clicking the same column, cycle through asc -> desc -> null
      if (sortBy === column) {
        if (orderBy === "asc") {
          newDirection = "desc";
        } else if (orderBy === "desc") {
          newDirection = null;
        }
      }

      // Update or remove params based on new direction
      if (newDirection) {
        newParams.set(sortByParam, column);
        newParams.set(orderByParam, newDirection);
      } else {
        newParams.delete(sortByParam);
        newParams.delete(orderByParam);
      }

      setSearchParams(newParams, { replace });
    },
    [searchParams, setSearchParams, sortBy, orderBy, sortByParam, orderByParam, replace],
  );

  const getSortDirection = useCallback(
    (column: string): SortDirection => {
      return sortBy === column ? orderBy : null;
    },
    [sortBy, orderBy],
  );

  return {
    sortBy,
    orderBy,
    requestSort,
    getSortDirection,
  };
}
