import React, { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/utils/helpers/classNames";
import type { QueryParamSearchProps } from "./QueryParamSearch.types";
import { useDebounce } from "@/hooks";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const QueryParamSearch: React.FC<QueryParamSearchProps> = ({
  paramName = "search", // Default to 'search'
  debounceDelay = 500, // Default debounce delay
  placeholder = "Search...",
  children,
  className,
  ...rest
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Initialize local state from URL parameter
  const initialValue = useMemo(
    () => searchParams.get(paramName) || "",
    [searchParams, paramName],
  );

  const [searchInput, setSearchInput] = useState(initialValue);

  // 2. Debounce the local search input
  const debouncedSearch = useDebounce(searchInput, debounceDelay);

  // 3. Update URL when the debounced search changes
  useEffect(() => {
    // We use a functional update for setSearchParams to ensure we work off the latest state
    setSearchParams(
      (prevParams) => {
        const newParams = new URLSearchParams(prevParams.toString());

        // Get the value that should be in the URL (which might be the debounced one)
        const currentValueInUrl = newParams.get(paramName);

        if (debouncedSearch) {
          // Only update if the debounced value is different from the current URL value
          if (debouncedSearch !== currentValueInUrl) {
            newParams.set(paramName, debouncedSearch);
            // Crucial: Always reset to page 1 when the search term changes
            newParams.set("page", "1");
          }
        } else {
          // If the search input is cleared, remove the parameter
          if (currentValueInUrl) {
            newParams.delete(paramName);
            // Crucial: Reset to page 1 when clearing search
            newParams.delete("page");
          }
        }

        return newParams;
      },
      { replace: true },
    );
  }, [debouncedSearch, paramName, setSearchParams]);

  // 4. Handle input change
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  }, []);

  return (
    <div className={cn("w-full max-w-md relative", className)}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchInput}
        onChange={handleChange}
        className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        {...rest}
      />
    </div>
  );
};

export default QueryParamSearch;
