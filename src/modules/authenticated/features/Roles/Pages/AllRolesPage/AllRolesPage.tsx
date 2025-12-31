import React, { useCallback } from "react";
import type { AllRolesPageProps } from "./AllRolesPage.types";
import type {
  AdminRole,
  AdminRolesPaginatedResponse,
  AllAdminRoleParams,
} from "@/shared/types";
import {
  PermissionGuard,
  ConfirmDialog,
  TableActionButtons,
  PermissionBadges,
  TruncatedText,
} from "@/components/common";
import {
  QueryParamFilter,
  QueryParamSearch,
} from "@/components/common/queryParams";
import {
  Button,
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
} from "@/components/ui";
import {
  CardDescription,
  CardTitle,
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/Card";
import { useModal, useCan, useCrudPage } from "@/hooks";
import { AdminUserPermissions, RolePermissions } from "@/shared/constants";
import { formatDate } from "@/utils/helpers";
import { PlusIcon, Edit, Trash2, UserPlus, Users } from "lucide-react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { AdminAllRolesQueryKey } from "../../api/roles-query-key";
import { useAdminDeleteRole } from "../../hooks/useAdminRoles";
import {
  AddUpdateRole,
  AssignAdminRoleModal,
  AssignedAdminRoleModal,
} from "../../components/modals";
import { AdminRolesAPI } from "../../api/admin-roles.api";
import { defaultParams } from "../../../Genres/components/AdminGenresParamFilter/AdminGenresParamFilter.types";
import { filters } from "./filter.const";

const AllRolesPage: React.FC<AllRolesPageProps> = ({ children }) => {
  const navigate = useNavigate();
  const initialData = useLoaderData<AdminRolesPaginatedResponse>();

  const deleteModal = useModal<AdminRole>();
  const createUpdateModal = useModal<void | AdminRole>();
  const assignModal = useModal<void | AdminRole>();
  const assignedModal = useModal<void | AdminRole>();

  // Permission checks
  const canCreate = useCan({
    roles: ["ADMIN"],
    permissions: RolePermissions.CREATE,
  });
  const canDelete = useCan({
    roles: ["ADMIN"],
    permissions: RolePermissions.DELETE,
  });
  const canUpdate = useCan({
    roles: ["ADMIN"],
    permissions: RolePermissions.EDIT,
  });

  const canAssign = useCan({
    roles: ["ADMIN"],
    permissions: RolePermissions.ASSIGN,
  });
  const canViewAssigned = useCan({
    roles: ["ADMIN"],
    permissions: [RolePermissions.VIEW, AdminUserPermissions?.VIEW],
  });

  // Delete mutation
  const { mutate: solfDeleteItem, isPending: isSolfDeleting } =
    useAdminDeleteRole();

  const {
    data,
    isLoading,
    pagination,
    handlePageChange,
    requestSort,
    getSortDirection,
  } = useCrudPage<AllAdminRoleParams, AdminRole>({
    queryKey: AdminAllRolesQueryKey,
    queryFn: AdminRolesAPI.getRoles,
    initialData,
    defaultParams: {
      sortBy: "name",
      orderBy: "asc",
      page: 1,
      limit: 10,
      entity: undefined,
      search: undefined,
    },
    parseParams: (searchParams) => ({
      search: searchParams.get("search") || undefined,
      parentId: searchParams.get("parentId") || undefined,
      sortBy:
        (searchParams.get("sortBy") as AllAdminRoleParams["sortBy"]) || "name",
      orderBy:
        (searchParams.get("orderBy") as AllAdminRoleParams["orderBy"]) || "asc",
      page: Number(searchParams.get("page") || "1"),
      limit: Number(searchParams.get("limit") || "10"),
      entity: searchParams.get("entity") || undefined,
    }),
  });

  const handleRowClick = useCallback(
    (id: string) => {
      navigate(`/authenticated/roles/${id}`);
    },
    [navigate],
  );

  //for delete modal
  const handleDeleteClick = useCallback(
    (item: AdminRole, e: React.MouseEvent) => {
      e.stopPropagation();
      deleteModal.open(item);
    },
    [deleteModal],
  );
  const confirmDelete = useCallback(() => {
    if (deleteModal.data) {
      solfDeleteItem(deleteModal.data?.id, {
        onSuccess: () => {
          deleteModal.close();
        },
      });
    }
  }, [deleteModal.data]);

  //eoc delete modal
  const handleUpdateClick = useCallback(
    (item: AdminRole, e: React.MouseEvent) => {
      e.stopPropagation();
      console.log("🔐 AllGenresPage: Opening update modal for", item);
      item && createUpdateModal.open(item);
    },
    [createUpdateModal],
  );

  const handleAssignClick = useCallback(
    (item: AdminRole, e: React.MouseEvent) => {
      e.stopPropagation();
      console.log("🔐 AllGenresPage: Opening update modal for", item);
      item && assignModal.open(item);
    },
    [assignModal],
  );
  const handleViewAssigned = useCallback(
    (item: AdminRole, e: React.MouseEvent) => {
      e.stopPropagation();
      console.log("🔐 AllGenresPage: Opening assigned modal for", item);
      item && assignedModal.open(item);
    },
    [assignedModal],
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
      <PermissionGuard permissions={RolePermissions.EDIT} roles={["ADMIN"]}>
        <AddUpdateRole
          key={createUpdateModal.data?.id ?? "create"}
          open={createUpdateModal.isOpen}
          onOpenChange={handleModalClose}
          item={createUpdateModal.data ?? null}
        />
      </PermissionGuard>

      <PermissionGuard permissions={RolePermissions.DELETE} roles={["ADMIN"]}>
        <ConfirmDialog
          open={deleteModal.isOpen}
          onOpenChange={deleteModal.close}
          onConfirm={confirmDelete}
          title="Delete Role"
          description={`Are you sure you want to delete "${deleteModal.data?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
          isLoading={isSolfDeleting}
        />
      </PermissionGuard>

      <PermissionGuard permissions={RolePermissions.ASSIGN} roles={["ADMIN"]}>
        <AssignAdminRoleModal
          key={`assign-${assignModal.data?.id ?? "assign"}`}
          open={assignModal.isOpen}
          onOpenChange={assignModal.close}
          item={assignModal.data ?? null}
        />
      </PermissionGuard>

      <PermissionGuard
        permissions={[RolePermissions.ASSIGN, AdminUserPermissions?.VIEW]}
        roles={["ADMIN"]}
      >
        <AssignedAdminRoleModal
          key={`assigned-${assignedModal.data?.id ?? "assigned"}`}
          open={assignedModal.isOpen}
          onOpenChange={assignedModal.close}
          item={assignedModal.data ?? null}
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
                Roles Management
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Manage and organize your roles
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
                Add New Role
              </Button>
            )}
          </div>

          {/* Search Bar */}
          <div className="w-full flex justify-between gap-2 items-baseline">
            <QueryParamSearch
              paramName="search"
              debounceDelay={500}
              placeholder="Search roles..."
            />
            {/* <AdminGenresParamFilter /> */}

            <QueryParamFilter
              filters={filters}
              className="w-full"
              defaultParams={defaultParams}
            />
          </div>
        </CardHeader>

        <CardContent className="!p-0">
          <div className="w-full overflow-hidden rounded-b-xl h-full bg-card/30 backdrop-blur-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  {/* <TableSortableHead */}
                  {/*   sortDirection={getSortDirection("name")} */}
                  {/*   onSort={() => requestSort("name")} */}
                  {/* > */}
                  {/*   Name */}
                  {/* </TableSortableHead> */}

                  <TableSortableHead
                    sortDirection={getSortDirection("displayName")}
                    onSort={() => requestSort("displayName")}
                  >
                    Display Name
                  </TableSortableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Permissions</TableHead>
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
                    <TableCell colSpan={8} className="h-32 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : data && data.length > 0 ? (
                  data.map((item) => (
                    <TableRow
                      key={item.id}
                      onClick={() => handleRowClick(item.id)}
                      className="cursor-pointer"
                    >
                      {/* <TableCell className="font-semibold group-hover:text-primary"> */}
                      {/*   {item.name} */}
                      {/* </TableCell> */}

                      <TableCell className="max-w-xs truncate text-muted-foreground group-hover:text-foreground">
                        {item.displayName}
                      </TableCell>
                      <TableCell className="max-w-md text-muted-foreground group-hover:text-foreground">
                        <TruncatedText text={item.description} maxLength={30} />
                      </TableCell>
                      <TableCell className="min-w-[200px]">
                        <PermissionBadges
                          permissions={item.permissions}
                          maxDisplay={4}
                          size="sm"
                        />
                      </TableCell>

                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {formatDate(item.createdAt)}
                      </TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {formatDate(item.updatedAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <TableActionButtons
                          item={item}
                          actions={[
                            {
                              key: `assign-${item.id}`,
                              label: "Assign",
                              icon: UserPlus,
                              onClick: handleAssignClick,
                              visible: canAssign,
                              variant: "primary",
                            },

                            {
                              key: `assigned-${item.id}`,
                              label: "View Assigned Users",
                              icon: Users,
                              onClick: handleViewAssigned,
                              visible: canViewAssigned,
                            },
                            {
                              key: `update-${item.id}`,
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
                                deleteModal.data?.id === item.id,
                              variant: "danger",
                            },
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={8} className="h-32">
                      <EmptyState title="No roles found" />
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
                {pagination.total} total roles)
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

export default AllRolesPage;
