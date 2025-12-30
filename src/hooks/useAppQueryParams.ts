import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useParamUpdate } from "./useParamUpdate";
import type { UseParamUpdateReturn } from "./useParamUpdate";

export interface UseAppQueryParamsOptions<T extends Record<string, unknown>> {
  /**
   * Default values for query parameters
   */
  defaultParams?: Partial<T>;
  
  /**
   * Parser function to transform URL params into typed object
   * If not provided, uses generic string parsing
   */
  parseParams?: (searchParams: URLSearchParams) => T;
  
  /**
   * Whether to replace the current history entry instead of pushing a new one
   * @default true
   */
  replace?: boolean;
}

export interface UseAppQueryParamsReturn<T extends Record<string, unknown>>
  extends UseParamUpdateReturn {
  /**
   * Parsed query parameters with default values applied
   */
  params: T;
  
  /**
   * Raw URLSearchParams object
   */
  searchParams: URLSearchParams;
  
  /**
   * Update specific params while preserving others
   */
  setParams: (updates: Partial<T>) => void;
  
  /**
   * Reset all params to defaults
   */
  resetParams: () => void;
}

/**
 * Hook for managing typed URL query parameters with defaults
 * 
 * @example
 * ```tsx
 * interface MovieFilters {
 *   search?: string;
 *   genreId?: string;
 *   page: number;
 *   limit: number;
 *   sortBy?: 'title' | 'createdAt';
 *   orderBy?: 'asc' | 'desc';
 * }
 * 
 * const { params, setParams, updateParams } = useAppQueryParams<MovieFilters>({
 *   defaultParams: {
 *     page: 1,
 *     limit: 10,
 *     orderBy: 'desc',
 *   },
 *   parseParams: (searchParams) => ({
 *     search: searchParams.get('search') || undefined,
 *     genreId: searchParams.get('genreId') || undefined,
 *     page: Number(searchParams.get('page') || '1'),
 *     limit: Number(searchParams.get('limit') || '10'),
 *     sortBy: searchParams.get('sortBy') as MovieFilters['sortBy'],
 *     orderBy: (searchParams.get('orderBy') as MovieFilters['orderBy']) || 'desc',
 *   }),
 * });
 * 
 * // Access typed params
 * console.log(params.page); // number
 * console.log(params.sortBy); // 'title' | 'createdAt' | undefined
 * 
 * // Update params (type-safe)
 * setParams({ page: 2, genreId: 'action-uuid' });
 * 
 * // Or use raw updateParams for more control
 * updateParams({ search: null }); // Remove search param
 * ```
 */
export function useAppQueryParams<T extends Record<string, unknown>>(
  options: UseAppQueryParamsOptions<T> = {},
): UseAppQueryParamsReturn<T> {
  const { defaultParams = {}, parseParams, replace = true } = options;
  const [searchParams] = useSearchParams();
  const paramUpdate = useParamUpdate({ replace });

  // Parse current params from URL
  const params = useMemo<T>(() => {
    if (parseParams) {
      // Use custom parser if provided
      const parsed = parseParams(searchParams);
      return { ...defaultParams, ...parsed } as T;
    }

    // Generic parser: convert all params to strings
    const parsed: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      parsed[key] = value;
    });
    return { ...defaultParams, ...parsed } as T;
  }, [searchParams, defaultParams, parseParams]);

  // Type-safe param setter
  const setParams = (updates: Partial<T>) => {
    const stringified: Record<string, string | number | null | undefined> = {};
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        stringified[key] = null; // Remove param
      } else if (typeof value === "boolean") {
        stringified[key] = value ? "true" : "false";
      } else if (typeof value === "number") {
        stringified[key] = value;
      } else {
        stringified[key] = String(value);
      }
    });
    
    paramUpdate.updateParams(stringified);
  };

  // Reset to defaults
  const resetParams = () => {
    paramUpdate.clearParams();
    if (Object.keys(defaultParams).length > 0) {
      setParams(defaultParams as Partial<T>);
    }
  };

  return {
    params,
    searchParams,
    setParams,
    resetParams,
    ...paramUpdate,
  };
}
