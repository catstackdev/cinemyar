import React from "react";
import type { DeletedGenresPageProps } from "./DeletedGenresPage.types";
import {
  PermissionGuard,
  ConfirmDialog,
  TableActionButtons,
} from "@/components/common";
import { QueryParamSearch } from "@/components/common/queryParams";
import {
  Card,
  TableHeader,
  TableRow,
  TableSortableHead,
  TableHead,
  TableBody,
  TableCell,
  EmptyState,
  Pagination,
  Container,
  Table,
  FormField,
  Button,
} from "@/components/ui";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { useCrudPage, useModal } from "@/hooks";
import { useCan } from "@/hooks/useCan";
import type {
  AdminGenresApiResponse,
  GenrePaginationParams,
  AdminGenreSerialized,
} from "@/shared/types";
import { formatDate } from "@/utils/helpers";
import { ArchiveRestore, Trash2 } from "lucide-react";
import { useLoaderData } from "react-router-dom";
import { AdminGenresAPI } from "../../api/admin-genres.api";
import { AdminGenresParamFilter } from "../../components";
import { AdminAllDeletedGenreQueryKey } from "../../hooks/admin-genere.query.key";
import {
  useDeletedGenreAllRestore,
  useDeletedGenreRestore,
  usePermanentDeleteAllGenre,
  usePermanentDeleteGenre,
} from "../../hooks/useAdminGenres";
import {
  type DeleteGenreFormData,
  DeleteGenreSchema,
} from "@/schemas/movie.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GenrePermissions } from "@/shared/constants";

const DeletedGenresPage: React.FC<DeletedGenresPageProps> = ({ children }) => {
  // const navigate = useNavigate();

  const initialData = useLoaderData<AdminGenresApiResponse>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DeleteGenreFormData>({
    resolver: zodResolver(DeleteGenreSchema),
  });

  const deleteModal = useModal<AdminGenreSerialized>();
  const restoreModal = useModal<AdminGenreSerialized>();
  const restoreAllModal = useModal<AdminGenreSerialized>();
  const permanentDeleteAllModal = useModal<void>();

  const canDeletedRestore = useCan({
    roles: ["ADMIN"],
    permissions: GenrePermissions.RESTORE,
  });
  const canDeletePermanent = useCan({
    roles: ["ADMIN"],
    permissions: GenrePermissions.DELETE_PERMANENT,
  });

  // Delete mutation
  const { mutate: permanentDeleteGenre, isPending: isDeleting } =
    usePermanentDeleteGenre();
  const { mutate: permanentDeleteAllGenre, isPending: isAllDeleting } =
    usePermanentDeleteAllGenre();
  const { mutate: restoreGenre, isPending: isRestoring } =
    useDeletedGenreRestore();
  const { mutate: restoreAllGenre, isPending: isRestoringAll } =
    useDeletedGenreAllRestore();
  const {
    data,
    isLoading,
    pagination,
    handlePageChange,
    requestSort,
    getSortDirection,
  } = useCrudPage<GenrePaginationParams, AdminGenreSerialized>({
    queryKey: AdminAllDeletedGenreQueryKey,
    queryFn: AdminGenresAPI.getDeletedGenres,
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

  // const handleRowClick = useCallback(
  //   (genreId: string) => {
  //     navigate(`/authenticated/genres/${genreId}`);
  //   },
  //   [navigate],
  // );

  const onRestore = () => {
    const isBulk = restoreAllModal.isOpen;
    const mutation = isBulk ? restoreAllGenre : restoreGenre;
    const payload = isBulk ? undefined : restoreModal.data?.id;
    mutation(payload, {
      onSuccess: () => {
        isBulk ? restoreAllModal.close() : restoreModal.close();
        reset();
      },
    });
  };

  const onDelete = (formData: DeleteGenreFormData) => {
    const isBulk = permanentDeleteAllModal.isOpen;
    const mutation = isBulk ? permanentDeleteAllGenre : permanentDeleteGenre;
    const payload = isBulk
      ? { reason: formData.reason }
      : { id: deleteModal.data?.id!, reason: formData.reason };

    mutation(payload as any, {
      onSuccess: () => {
        reset();
        isBulk ? permanentDeleteAllModal.close() : deleteModal.close();
      },
    });
  };

  // Reusable Reason Field for Modals
  const ReasonField = (
    <FormField.Root
      name="reason"
      layout="stacked"
      error={errors.reason?.message}
    >
      <FormField.Label required>Reason for Delete</FormField.Label>
      <FormField.Textarea
        {...register("reason")}
        placeholder="Why is this being removed?"
        disabled={isSubmitting}
      />
    </FormField.Root>
  );
  return (
    <Container size="full" className="relative p-4 min-h-full">
      {/* Modals with Permission Guards */}
      <PermissionGuard permissions={GenrePermissions.RESTORE} roles={["ADMIN"]}>
        <ConfirmDialog
          open={restoreModal.isOpen || restoreAllModal.isOpen}
          onOpenChange={(open) => {
            if (!open) {
              restoreModal.close();
              restoreAllModal.close();
            }
          }}
          onConfirm={onRestore}
          title={
            restoreAllModal.isOpen ? "Restore All Genres" : ` Restore Genre`
          }
          description={
            restoreAllModal.isOpen
              ? "Restore All Genres"
              : `Restore "${restoreModal.data?.name}"?`
          }
          isLoading={isRestoring || isRestoringAll}
        />
      </PermissionGuard>

      <PermissionGuard
        permissions={GenrePermissions.DELETE_PERMANENT}
        roles={["ADMIN"]}
      >
        <ConfirmDialog
          open={deleteModal.isOpen || permanentDeleteAllModal.isOpen}
          onOpenChange={(open) => {
            if (!open) {
              deleteModal.close();
              permanentDeleteAllModal.close();
              reset();
            }
          }}
          onConfirm={handleSubmit(onDelete)}
          title={
            permanentDeleteAllModal.isOpen
              ? "Delete All Genres"
              : "Delete Genre"
          }
          variant="danger"
          isLoading={isDeleting || isAllDeleting}
        >
          {ReasonField}
          <p className="mt-4">
            Are you sure? This action{" "}
            <span className="font-bold text-danger">cannot be undone.</span>
          </p>
        </ConfirmDialog>
      </PermissionGuard>

      <Card className="w-full glass border-border/50 shadow-xl">
        <CardHeader
          divided
          className="flex rounded-t-lg flex-col gap-4 bg-gradient-to-r from-primary/5 via-transparent to-info/5"
        >
          <div className="flex flex-row items-center justify-between w-full">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                Deleted Genres Management
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Manage and organize your movie genres
              </CardDescription>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full flex justify-between gap-2 items-baseline">
            <QueryParamSearch
              paramName="search"
              debounceDelay={500}
              placeholder="Search genres..."
            />

            <AdminGenresParamFilter />

            {data?.length > 0 && (
              <PermissionGuard
                permissions={GenrePermissions.RESTORE}
                roles={["ADMIN"]}
              >
                <Button
                  className="pt-1"
                  variant="glass"
                  color="success"
                  onClick={() => restoreAllModal.open()}
                  size="sm"
                >
                  <ArchiveRestore className="w-5 h-5" />
                </Button>
              </PermissionGuard>
            )}

            {data?.length > 0 && (
              <PermissionGuard
                permissions={GenrePermissions.DELETE_PERMANENT}
                roles={["ADMIN"]}
              >
                <Button
                  className="pt-1"
                  variant="glass"
                  color="danger"
                  onClick={() => permanentDeleteAllModal.open()}
                  size="sm"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </PermissionGuard>
            )}
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
                  {/* <TableHead>Status</TableHead> */}
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
                    Deleted At
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
                    <TableRow key={genre.id} className="cursor-pointer">
                      <TableCell className="font-semibold group-hover:text-primary">
                        {genre.name}
                      </TableCell>
                      {/* <TableCell> */}
                      {/*   <Chip */}
                      {/*     variant={genre.isActive ? "success" : "default"} */}
                      {/*     className="font-sans text-xs" */}
                      {/*   > */}
                      {/*     {genre.isActive ? "Active" : "Inactive"} */}
                      {/*   </Chip> */}
                      {/* </TableCell> */}
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
                        {formatDate(genre.deletedAt!)}
                      </TableCell>
                      <TableCell className="text-right">
                        <TableActionButtons
                          item={genre}
                          actions={[
                            {
                              key: "restore",
                              label: "Restore",
                              icon: ArchiveRestore,
                              onClick: () => restoreModal.open(genre),
                              visible: canDeletedRestore,
                              loading:
                                isRestoring &&
                                restoreModal.data?.id === genre.id,
                              variant: "success",
                            },
                            {
                              key: "delete",
                              label: "Delete",
                              icon: Trash2,
                              onClick: () => deleteModal.open(genre),
                              visible: canDeletePermanent,
                              loading:
                                isDeleting && deleteModal.data?.id === genre.id,
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

export default DeletedGenresPage;
