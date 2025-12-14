import React, { useMemo, useCallback, useState } from "react";
import type { AllGenresPageProps } from "./AllGenresPage.types";
import {
  Card,
  Button,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip,
  EmptyState,
  Container,
  Table,
  Pagination,
  TableSortableHead,
} from "@/components/ui";
import { useTableSortParams } from "@/components/ui/Table";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { formatDate } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon, Edit, Search } from "lucide-react";
import { useNavigate, useLoaderData, useSearchParams } from "react-router-dom";
import type {
  AdminGenresApiResponse,
  GenrePaginationParams,
} from "@/shared/types/types";
import { AdminAllGenreQueryKey } from "../../hooks/admin-genere.query.key";
import { AdminGenresAPI } from "../../api/admin-genres.api";
import { useDebounce } from "@/hooks";
import { AdminGenresParamFilter } from "../../components";
import { QueryParamSearch } from "@/components/common/queryParams";

const AllGenresPage: React.FC<AllGenresPageProps> = ({ children }) => {
  const navigate = useNavigate();
  const initialData = useLoaderData<AdminGenresApiResponse>();
  const [searchParams, setSearchParams] = useSearchParams();
  // const [searchInput, setSearchInput] = useState(
  //   searchParams.get("search") || "",
  // );

  // Sorting hook
  const { requestSort, getSortDirection } = useTableSortParams({
    defaultSortBy: "name",
    defaultOrderBy: "asc",
  });

  const params: GenrePaginationParams = useMemo(
    () => ({
      search: searchParams.get("search") || undefined,
      parentId: searchParams.get("parentId") || undefined,
      sortBy:
        (searchParams.get("sortBy") as GenrePaginationParams["sortBy"]) ||
        "name",
      orderBy:
        (searchParams.get("orderBy") as GenrePaginationParams["orderBy"]) ||
        "asc",
      page: Number(searchParams.get("page") || "1"),
      limit: Number(searchParams.get("limit") || "10"),
    }),
    [searchParams],
  );

  const { data, isLoading } = useQuery<AdminGenresApiResponse>({
    queryKey: AdminAllGenreQueryKey(params),
    queryFn: () => AdminGenresAPI.getGenres(params),
    initialData,
  });

  // const debouncedSearch = useDebounce(searchInput, 500);

  // Update URL params when debounced search changes
  // React.useEffect(() => {
  //   const newParams = new URLSearchParams(searchParams);
  //   if (debouncedSearch) {
  //     newParams.set("search", debouncedSearch);
  //     newParams.set("page", "1"); // Reset to page 1 on search
  //   } else {
  //     newParams.delete("search");
  //   }
  //   setSearchParams(newParams, { replace: true });
  // }, [debouncedSearch]);

  const updateParams = useCallback(
    (updates: Partial<GenrePaginationParams>) => {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          newParams.set(key, String(value));
        } else {
          newParams.delete(key);
        }
      });
      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateParams({ page });
    },
    [updateParams],
  );

  const handleRowClick = useCallback(
    (genreId: string) => {
      navigate(`/authenticated/genres/${genreId}`);
    },
    [navigate],
  );

  const handleUpdateClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement genre update modal
  }, []);

  const totalPages = data?.data?.meta?.totalPages ?? 1;
  const currentPage = params.page ?? 1;
  const totalItems = data?.data?.meta?.total ?? 0;

  return (
    <Container size="full" className="relative p-4 min-h-full">
      <Card className="w-full glass border-border/50 shadow-xl">
        <CardHeader
          divided
          className="flex rounded-t-lg flex-col gap-4 bg-gradient-to-r from-primary/5 via-transparent to-info/5"
        >
          <div className="flex flex-row items-center justify-between w-full">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                Genres Management
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Manage and organize your movie genres
              </CardDescription>
            </div>
            <Button
              leftIcon={<PlusIcon className="w-4 h-4" />}
              size="sm"
              variant="glass"
              className="shadow-md hover:shadow-lg transition-shadow"
              disabled
            >
              Add New Genre
            </Button>
          </div>

          {/* Search Bar */}
          <div className="w-full flex justify-between gap-2 items-baseline">
            <QueryParamSearch
              paramName="search"
              debounceDelay={500}
              placeholder="Search genres..."
            />

            <AdminGenresParamFilter />
          </div>
        </CardHeader>

        <CardContent className="!p-0">
          <div className="w-full overflow-hidden rounded-b-xl h-full bg-card/30 backdrop-blur-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableSortableHead
                    sortDirection={getSortDirection("name")}
                    onSort={() => requestSort("name")}
                  >
                    Name
                  </TableSortableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                  <TableSortableHead
                    sortDirection={getSortDirection("createdAt")}
                    onSort={() => requestSort("createdAt")}
                  >
                    Created At
                  </TableSortableHead>
                  <TableSortableHead
                    sortDirection={getSortDirection("updatedAt")}
                    onSort={() => requestSort("updatedAt")}
                  >
                    Updated At
                  </TableSortableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={6} className="h-32 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : data?.data?.data && data.data.data.length > 0 ? (
                  data.data.data.map((genre) => (
                    <TableRow
                      key={genre.id}
                      onClick={() => handleRowClick(genre.id)}
                      className="cursor-pointer"
                    >
                      <TableCell className="font-semibold group-hover:text-primary">
                        {genre.name}
                      </TableCell>
                      <TableCell>
                        <Chip
                          variant={genre.isActive ? "success" : "default"}
                          className="font-sans text-xs"
                        >
                          {genre.isActive ? "Active" : "Inactive"}
                        </Chip>
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-muted-foreground group-hover:text-foreground">
                        {genre.description}
                      </TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {formatDate(genre.createdAt)}
                      </TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {formatDate(genre.updatedAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="glass"
                            color="primary"
                            size="xs"
                            onClick={handleUpdateClick}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            disabled
                          >
                            <Edit className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={6} className="h-32">
                      <EmptyState title="No genres found" />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Showing page {currentPage} of {totalPages} ({totalItems} total
                genres)
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                showFirstLast
              />
            </div>
          )}

          {children}
        </CardContent>
      </Card>
    </Container>
  );
};

export default AllGenresPage;
