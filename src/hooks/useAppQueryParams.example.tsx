/**
 * USAGE EXAMPLES FOR useAppQueryParams
 * 
 * This file demonstrates how to use the useAppQueryParams hook.
 * DO NOT import this file in production code - it's for documentation only.
 */

import { useAppQueryParams } from "./useAppQueryParams";

// ============================================================================
// Example 1: Basic Usage with Simple Filters
// ============================================================================
interface SimpleFilters extends Record<string, unknown> {
  search?: string;
  page: number;
  limit: number;
}

function SimpleExample() {
  const { params, setParams } = useAppQueryParams<SimpleFilters>({
    defaultParams: {
      page: 1,
      limit: 10,
    },
  });

  // Access typed params
  console.log(params.page); // number
  console.log(params.search); // string | undefined

  // Update params
  const handleSearchChange = (search: string) => {
    setParams({ search, page: 1 }); // Reset to page 1 on search
  };

  const handlePageChange = (page: number) => {
    setParams({ page });
  };

  return null; // JSX omitted for brevity
}

// ============================================================================
// Example 2: Advanced Usage with Custom Parser (Like useCrudPage)
// ============================================================================
interface MovieFilters extends Record<string, unknown> {
  search?: string;
  genreId?: string;
  page: number;
  limit: number;
  sortBy?: "title" | "createdAt" | "rating";
  orderBy?: "asc" | "desc";
  isFeatured?: boolean;
}

function AdvancedExample() {
  const { params, setParams, updateParams, resetParams } =
    useAppQueryParams<MovieFilters>({
      defaultParams: {
        page: 1,
        limit: 20,
        orderBy: "desc",
        sortBy: "createdAt",
      },
      parseParams: (searchParams) => ({
        search: searchParams.get("search") || undefined,
        genreId: searchParams.get("genreId") || undefined,
        page: Number(searchParams.get("page") || "1"),
        limit: Number(searchParams.get("limit") || "20"),
        sortBy: (searchParams.get("sortBy") as MovieFilters["sortBy"]) || "createdAt",
        orderBy: (searchParams.get("orderBy") as MovieFilters["orderBy"]) || "desc",
        isFeatured:
          searchParams.get("isFeatured") === "true"
            ? true
            : searchParams.get("isFeatured") === "false"
              ? false
              : undefined,
      }),
    });

  // Type-safe parameter access
  console.log(params.sortBy); // "title" | "createdAt" | "rating"
  console.log(params.page); // number

  // Update multiple params at once
  const handleFilterChange = (genreId: string, featured: boolean) => {
    setParams({
      genreId,
      isFeatured: featured,
      page: 1, // Reset to first page
    });
  };

  // Remove a specific param
  const clearGenreFilter = () => {
    setParams({ genreId: undefined });
  };

  // Reset all params to defaults
  const handleReset = () => {
    resetParams();
  };

  // Use raw updateParams for more control
  const handleSort = (sortBy: MovieFilters["sortBy"]) => {
    updateParams({ sortBy });
  };

  return null; // JSX omitted for brevity
}

// ============================================================================
// Example 3: Integration with API Calls (Like in a Page Component)
// ============================================================================
import { useQuery } from "@tanstack/react-query";

interface UserFilters extends Record<string, unknown> {
  search?: string;
  dynamicRoleId?: string;
  exceptdynamicRoleId?: string;
  sortBy?: "username" | "email" | "createdAt" | "updatedAt";
  orderBy?: "asc" | "desc";
  isBanned?: boolean;
  page: number;
  limit: number;
}

function PageComponentExample() {
  const { params, setParams } = useAppQueryParams<UserFilters>({
    defaultParams: {
      page: 1,
      limit: 10,
      orderBy: "asc",
    },
    parseParams: (searchParams) => ({
      search: searchParams.get("search") || undefined,
      dynamicRoleId: searchParams.get("dynamicRoleId") || undefined,
      exceptdynamicRoleId: searchParams.get("exceptdynamicRoleId") || undefined,
      sortBy: searchParams.get("sortBy") as UserFilters["sortBy"],
      orderBy: (searchParams.get("orderBy") as UserFilters["orderBy"]) || "asc",
      isBanned:
        searchParams.get("isBanned") === "true"
          ? true
          : searchParams.get("isBanned") === "false"
            ? false
            : undefined,
      page: Number(searchParams.get("page") || "1"),
      limit: Number(searchParams.get("limit") || "10"),
    }),
  });

  // Use params in API calls
  const { data, isLoading } = useQuery({
    queryKey: ["users", params],
    queryFn: () => fetchUsers(params),
  });

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setParams({ page: newPage });
  };

  // Handle sorting
  const requestSort = (sortBy: UserFilters["sortBy"]) => {
    const newOrderBy =
      params.sortBy === sortBy && params.orderBy === "asc" ? "desc" : "asc";
    setParams({ sortBy, orderBy: newOrderBy });
  };

  return null; // JSX omitted for brevity
}

// Dummy function for example
async function fetchUsers(params: UserFilters): Promise<unknown> {
  return fetch(`/api/users?${new URLSearchParams(params as any)}`);
}

// ============================================================================
// Example 4: Using with QueryParamFilter (Current Pattern)
// ============================================================================
// NOTE: AdminUserAdminsFilter DOES NOT need useAppQueryParams!
// It already uses QueryParamFilter which handles URL params internally.
// 
// However, if you want to READ the params in the parent component:
function ParentComponentExample() {
  const { params } = useAppQueryParams<UserFilters>({
    defaultParams: { page: 1, limit: 10 },
    parseParams: (searchParams) => ({
      page: Number(searchParams.get("page") || "1"),
      limit: Number(searchParams.get("limit") || "10"),
      search: searchParams.get("search") || undefined,
      sortBy: searchParams.get("sortBy") as UserFilters["sortBy"],
      orderBy: searchParams.get("orderBy") as UserFilters["orderBy"],
    }),
  });

  // Now you can use params in the parent component
  // while QueryParamFilter manages the UI
  console.log("Current filters:", params);

  return null; // Would include <QueryParamFilter> in JSX
}
