import React, { useCallback } from "react";
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
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { formatDate } from "@/utils/helpers";
import { Edit, PlusIcon, Trash2 } from "lucide-react";
import { useNavigate, useLoaderData } from "react-router-dom";
import type {
  AdminGenresApiResponse,
  AdminGenreSerialized,
  GenrePaginationParams,
} from "@/shared/types";
import { AdminAllGenreQueryKey } from "../../hooks/admin-genere.query.key";
import { AdminGenresAPI } from "../../api/admin-genres.api";
import { AdminGenresParamFilter } from "../../components";
import { QueryParamSearch } from "@/components/common/queryParams";
import { AddNewGenres } from "../../components/modals";
import { useCan } from "@/hooks/useCan";
import {
  ConfirmDialog,
  PermissionGuard,
  TableActionButtons,
} from "@/components/common";
import { useSolfDeleteGenre } from "../../hooks/useAdminGenres";
import { useCrudPage, useModal } from "@/hooks";
import { GenrePermissions } from "@/shared/constants";

const AllGenresPage: React.FC<AllGenresPageProps> = ({ children }) => {
  const navigate = useNavigate();
  const initialData = useLoaderData<AdminGenresApiResponse>();

  const deleteModal = useModal<AdminGenreSerialized>();
  const createUpdateModal = useModal<void | AdminGenreSerialized>();

  // Permission checks
  const canCreate = useCan({
    roles: ["ADMIN"],
    permissions: GenrePermissions.CREATE,
  });
  const canDelete = useCan({
    roles: ["ADMIN"],
    permissions: GenrePermissions.DELETE,
  });
  const canUpdate = useCan({
    roles: ["ADMIN"],
    permissions: GenrePermissions.EDIT,
  });

  // Delete mutation
  const { mutate: solfDeleteGenre, isPending: isSolfDeleting } =
    useSolfDeleteGenre();

  const {
    data,
    isLoading,
    pagination,
    handlePageChange,
    requestSort,
    getSortDirection,
  } = useCrudPage<GenrePaginationParams, AdminGenreSerialized>({
    queryKey: AdminAllGenreQueryKey,
    queryFn: AdminGenresAPI.getGenres,
    initialData,
    defaultParams: {
      sortBy: "name",
      orderBy: "asc",
      page: 1,
      limit: 10,
    },
    parseParams: (searchParams) => ({
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
  });

  const handleRowClick = useCallback(
    (genreId: string) => {
      navigate(`/authenticated/genres/${genreId}`);
    },
    [navigate],
  );

  //for delete modal
  const handleDeleteClick = useCallback(
    (genre: AdminGenreSerialized, e: React.MouseEvent) => {
      e.stopPropagation();
      deleteModal.open(genre);
    },
    [deleteModal],
  );
  const confirmDelete = useCallback(() => {
    if (deleteModal.data) {
      solfDeleteGenre(deleteModal.data?.id, {
        onSuccess: () => {
          deleteModal.close();
        },
        onError: (error) => {
          console.error("Failed to delete genre:", error);
        },
      });
    }
  }, [deleteModal.data]);

  //eoc delete modal
  const handleUpdateClick = useCallback(
    (genre: AdminGenreSerialized, e: React.MouseEvent) => {
      e.stopPropagation();
      console.log("🔐 AllGenresPage: Opening update modal for", genre);
      genre && createUpdateModal.open(genre);
    },
    [createUpdateModal],
  );

  const handleModalClose = useCallback(
    (open: boolean) => {
      if (!open) {
        createUpdateModal.close();
      }
    },
    [createUpdateModal],
  );

  return (
    <Container size="full" className="relative p-4 min-h-full">
      {/* Modals with Permission Guards */}

      <PermissionGuard
        permissions={
          createUpdateModal.data?.id
            ? GenrePermissions.EDIT
            : GenrePermissions.CREATE
        }
        roles={["ADMIN"]}
      >
        <AddNewGenres
          key={createUpdateModal.data?.id ?? "create"}
          open={createUpdateModal.isOpen}
          onOpenChange={handleModalClose}
          genre={createUpdateModal.data ?? null}
        />
      </PermissionGuard>

      <PermissionGuard permissions={GenrePermissions.DELETE} roles={["ADMIN"]}>
        <ConfirmDialog
          open={deleteModal.isOpen}
          onOpenChange={deleteModal.close}
          onConfirm={confirmDelete}
          title="Delete Genre"
          description={`Are you sure you want to delete "${deleteModal.data?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
          isLoading={isSolfDeleting}
        />
      </PermissionGuard>

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
            {canCreate && (
              <Button
                leftIcon={<PlusIcon className="w-4 h-4" />}
                size="sm"
                variant="glass"
                className="shadow-md hover:shadow-lg transition-shadow"
                onClick={() => createUpdateModal.open()}
              >
                Add New Genre
              </Button>
            )}
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
                  <TableHead>Slug</TableHead>
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
                    <TableCell colSpan={7} className="h-32 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : data && data.length > 0 ? (
                  data.map((genre) => (
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
                        {genre.slug}
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
                        <TableActionButtons
                          item={genre}
                          actions={[
                            {
                              key: `update-${genre.id}`,
                              label: "Update",
                              icon: Edit,
                              onClick: handleUpdateClick,
                              visible: canUpdate,
                              variant: "success",
                            },
                            {
                              key: "delete",
                              label: "Delete",
                              icon: Trash2,
                              onClick: handleDeleteClick,
                              visible: canDelete,
                              loading:
                                isSolfDeleting &&
                                deleteModal.data?.id === genre.id,
                              variant: "danger",
                            },
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={7} className="h-32">
                      <EmptyState title="No genres found" />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Showing page {pagination.page} of {pagination.totalPages} (
                {pagination.total} total genres)
              </div>
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
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
