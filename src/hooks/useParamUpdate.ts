import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export interface UseParamUpdateOptions {
  /**
   * Whether to replace the current history entry instead of pushing a new one
   * @default true
   */
  replace?: boolean;
}

export interface UseParamUpdateReturn {
  /**
   * Update URL search params with the provided key-value pairs
   * - Removes params with undefined, null, or empty string values
   * - Converts all values to strings
   */
  updateParams: (updates: Record<string, string | number | null | undefined>) => void;
  
  /**
   * Get the current value of a URL param
   */
  getParam: (key: string) => string | null;
  
  /**
   * Remove specific params from the URL
   */
  removeParams: (keys: string[]) => void;
  
  /**
   * Clear all params from the URL
   */
  clearParams: () => void;
}

/**
 * Hook for managing URL search params
 * 
 * @example
 * ```tsx
 * const { updateParams, getParam } = useParamUpdate();
 * 
 * // Update single param
 * updateParams({ page: 2 });
 * 
 * // Update multiple params
 * updateParams({ page: 1, search: 'action', sortBy: 'name' });
 * 
 * // Remove param by setting to null/undefined
 * updateParams({ search: null });
 * 
 * // Get param value
 * const currentPage = getParam('page'); // "2"
 * ```
 */
export function useParamUpdate(options: UseParamUpdateOptions = {}): UseParamUpdateReturn {
  const { replace = true } = options;
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = useCallback(
    (updates: Record<string, string | number | null | undefined>) => {
      const newParams = new URLSearchParams(searchParams);
      
      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          newParams.set(key, String(value));
        } else {
          newParams.delete(key);
        }
      });
      
      setSearchParams(newParams, { replace });
    },
    [searchParams, setSearchParams, replace],
  );

  const getParam = useCallback(
    (key: string): string | null => {
      return searchParams.get(key);
    },
    [searchParams],
  );

  const removeParams = useCallback(
    (keys: string[]) => {
      const newParams = new URLSearchParams(searchParams);
      keys.forEach((key) => newParams.delete(key));
      setSearchParams(newParams, { replace });
    },
    [searchParams, setSearchParams, replace],
  );

  const clearParams = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace });
  }, [setSearchParams, replace]);

  return {
    updateParams,
    getParam,
    removeParams,
    clearParams,
  };
}
