import { useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useTableSortParams } from "@/components/ui/Table";
import { useParamUpdate } from "./useParamUpdate";
import type { PaginationMeta } from "@/shared/types";

export interface UseCrudPageOptions<TParams, TData> {
  /**
   * Function to generate query key from params
   */
  queryKey: (params: TParams) => unknown[];

  /**
   * Function to fetch data with params
   */
  queryFn: (
    params: TParams,
  ) => Promise<{ data: { data: TData[]; meta: PaginationMeta } }>;

  /**
   * Initial data from loader (SSR)
   */
  initialData?: { data: { data: TData[]; meta: PaginationMeta } };

  /**
   * Default parameters
   */
  defaultParams: Partial<TParams>;

  /**
   * Function to parse URL params into typed params
   */
  parseParams: (searchParams: URLSearchParams) => TParams;
}

export interface UseCrudPageReturn<TParams, TData> {
  // Data
  data: TData[];
  isLoading: boolean;

  // Pagination
  pagination: PaginationMeta;
  handlePageChange: (page: number) => void;

  // Parameters
  params: TParams;
  updateParams: (updates: Partial<TParams>) => void;

  // Sorting
  requestSort: (column: string) => void;
  getSortDirection: (column: string) => "asc" | "desc" | null;
}

/**
 * Comprehensive hook for CRUD page data management
 * Combines pagination, sorting, URL params, and data fetching
 *
 * @example
 * const { data, isLoading, pagination, requestSort, handlePageChange } = useCrudPage({
 *   queryKey: (params) => ['genres', params],
 *   queryFn: (params) => AdminGenresAPI.getGenres(params),
 *   initialData: loaderData,
 *   defaultParams: { sortBy: 'name', orderBy: 'asc', page: 1, limit: 10 },
 *   parseParams: (searchParams) => ({
 *     search: searchParams.get('search') || undefined,
 *     sortBy: searchParams.get('sortBy') as any || 'name',
 *     orderBy: searchParams.get('orderBy') as any || 'asc',
 *     page: Number(searchParams.get('page') || '1'),
 *     limit: Number(searchParams.get('limit') || '10'),
 *   }),
 * });
 */
export function useCrudPage<TParams extends Record<string, any>, TData>(
  options: UseCrudPageOptions<TParams, TData>,
): UseCrudPageReturn<TParams, TData> {
  const { queryKey, queryFn, initialData, defaultParams, parseParams } =
    options;

  const [searchParams] = useSearchParams();
  const { updateParams: updateUrlParams } = useParamUpdate();

  // Parse current params from URL
  const params = useMemo(
    () => parseParams(searchParams),
    [searchParams, parseParams],
  );

  // Sorting hook
  const { requestSort, getSortDirection } = useTableSortParams({
    defaultSortBy: (params as any).sortBy || (defaultParams as any).sortBy,
    defaultOrderBy: (params as any).orderBy || (defaultParams as any).orderBy,
  });

  // Fetch data
  const { data: response, isLoading } = useQuery({
    queryKey: queryKey(params),
    queryFn: () => queryFn(params),
    initialData,
  });

  // Extract data and pagination
  const data = response?.data?.data ?? [];
  // const pagination: PaginationMeta = {
  //   currentPage: response?.data?.meta?.page ?? params.page ?? 1,
  //   totalPages: response?.data?.meta?.totalPages ?? 1,
  //   total: response?.data?.meta?.total ?? 0,
  //   limit: response?.data?.meta?.limit ?? params.limit ?? 10,
  // };
  const pagination: PaginationMeta = response?.data?.meta ?? {
    total: 1,
    page: params.page ?? 1,
    limit: params.limit ?? 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };

  // Update params helper
  const updateParams = useCallback(
    (updates: Partial<TParams>) => {
      updateUrlParams(
        updates as Record<string, string | number | null | undefined>,
      );
    },
    [updateUrlParams],
  );

  // Page change handler
  const handlePageChange = useCallback(
    (page: number) => {
      // updateParams({ page } as Partial<TParams>);
      updateParams({ page } as unknown as Partial<TParams>);
    },
    [updateParams],
  );

  return {
    data,
    isLoading,
    pagination,
    handlePageChange,
    params,
    updateParams,
    requestSort,
    getSortDirection,
  };
}
