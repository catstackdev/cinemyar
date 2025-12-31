import React, { useMemo, useCallback } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import type { RoleDetailPageProps } from "./RoleDetailPage.types";
import type { ApiResponse } from "@/shared/types";
import {
  useAdminDeleteRole,
  useAdminRemoveRole,
} from "../../hooks/useAdminRoles";
import {
  Container,
  Badge,
  Button,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  EmptyState,
  Pagination,
  Skeleton,
  TableSortableHead,
} from "@/components/ui";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import {
  PermissionGuard,
  ConfirmDialog,
  PermissionBadges,
  TableActionButtons,
  UserChip,
} from "@/components/common";
import { useModal, useCan, useCrudPage } from "@/hooks";
import { RolePermissions, AdminUserPermissions } from "@/shared/constants";
import { formatDate } from "@/utils/helpers";
import {
  ArrowLeft,
  Edit,
  Trash2,
  UserPlus,
  Users,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { AddUpdateRole, AssignAdminRoleModal } from "../../components/modals";
import { PermissionCard } from "../../components";
import { AdminRolesAPI } from "../../api/admin-roles.api";
import type {
  AdminRoleDetailParams,
  AdminRoleDetailResponseData,
} from "../../api/admin-roles.types";
import { AdminAllRolesQueryKey } from "../../api/roles-query-key";
import {
  QueryParamSearch,
  QueryParamFilter,
} from "@/components/common/queryParams";
import { defaultParams } from "../../../Genres/components/AdminGenresParamFilter/AdminGenresParamFilter.types";
import { filters } from "./filter.const";

const RoleDetailPage: React.FC<RoleDetailPageProps> = () => {
  const navigate = useNavigate();
  const initialData = useLoaderData<ApiResponse<AdminRoleDetailResponseData>>();

  const {
    data: roleDetail,
    isLoading,
    pagination,
    handlePageChange,
    requestSort,
    getSortDirection,
  } = useCrudPage<AdminRoleDetailParams, AdminRoleDetailResponseData>({
    queryKey: AdminAllRolesQueryKey,
    queryFn: AdminRolesAPI.getRole,
    initialData,
    defaultParams: {
      sortBy: "username",
      orderBy: "asc",
      page: 1,
      limit: 10,
      search: undefined,
    },
    parseParams: (searchParams) => ({
      search: searchParams.get("search") || undefined,
      parentId: searchParams.get("parentId") || undefined,
      sortBy:
        (searchParams.get("sortBy") as AdminRoleDetailParams["sortBy"]) ||
        "name",
      orderBy:
        (searchParams.get("orderBy") as AdminRoleDetailParams["orderBy"]) ||
        "asc",
      page: Number(searchParams.get("page") || "1"),
      limit: Number(searchParams.get("limit") || "10"),
    }),
  });

  // Mutations
  const { mutate: deleteRole, isPending: isDeleting } = useAdminDeleteRole();
  const { mutate: removeRole, isPending: isRemoving } = useAdminRemoveRole();

  const editModal = useModal();
  const deleteModal = useModal();
  const assignModal = useModal();
  const removeRoleModal = useModal<{ userId: string; username: string }>();

  // Permission checks
  const canEdit = useCan({
    permissions: RolePermissions.EDIT,
    roles: ["ADMIN"],
  });
  const canDelete = useCan({
    permissions: RolePermissions.DELETE,
    roles: ["ADMIN"],
  });
  const canAssign = useCan({
    permissions: RolePermissions.ASSIGN,
    roles: ["ADMIN"],
  });
  const canViewUsers = useCan({
    permissions: [AdminUserPermissions.VIEW],
    roles: ["ADMIN"],
  });

  const apiData = (roleDetail?.data || initialData?.data) as any;

  const role = apiData?.role || {
    id: apiData?.id,
    name: apiData?.name,
    displayName: apiData?.displayName,
    description: apiData?.description,
    permissions: apiData?.permissions,
    createdAt: apiData?.createdAt,
    updatedAt: apiData?.updatedAt,
    createdBy: apiData?.createdBy,
  };

  const users =
    apiData?.data?.map((u: any) => ({
      id: u.id || u.user?.id || u.userId,
      email: u.email || u.user?.email,
      username: u.username || u.user?.username,
      role: u.role || u.user?.role,
      assignedAt: u.assignedAt,
      assignedBy: u.assignedBy,
    })) || [];

  // Modals

  // Group permissions by entity
  const groupedPermissions = useMemo(() => {
    if (!role?.permissions) return {};

    const groups: Record<string, string[]> = {};
    role.permissions.forEach((perm: string) => {
      const [entity] = perm.split(".");
      if (entity) {
        if (!groups[entity]) {
          groups[entity] = [];
        }
        groups[entity].push(perm);
      }
    });
    console.log("groups", groups);
    return groups;
  }, [role?.permissions]);

  // Handlers
  const handleBack = () => navigate("/authenticated/roles");

  const handleEdit = () => {
    if (role) {
      editModal.open(role);
    }
  };

  const handleDelete = () => {
    deleteModal.open();
  };

  const confirmDelete = useCallback(() => {
    if (role?.id) {
      deleteRole(role.id, {
        onSuccess: () => {
          deleteModal.close();
          navigate("/authenticated/roles");
        },
      });
    }
  }, [role?.id, deleteRole, deleteModal, navigate]);

  const handleAssign = () => {
    if (role) {
      assignModal.open(role);
    }
  };

  const handleRemoveRole = (userId: string, username: string) => {
    removeRoleModal.open({ userId, username });
  };

  const confirmRemoveRole = useCallback(() => {
    if (removeRoleModal.data && role?.id) {
      removeRole(
        { id: removeRoleModal.data.userId, roleId: role.id },
        {
          onSuccess: () => {
            removeRoleModal.close();
          },
        },
      );
    }
  }, [removeRoleModal.data, role?.id, removeRole, removeRoleModal]);

  const handleViewUser = (userId: string) => {
    navigate(`/authenticated/users/${userId}`);
  };

  if (!role && !isLoading) {
    return (
      <Container size="lg" className="py-8">
        <EmptyState
          title="Role not found"
          description="The role you're looking for doesn't exist."
        />
      </Container>
    );
  }

  return (
    <Container size="full" className="p-4 space-y-6">
      {/* Modals */}
      <PermissionGuard permissions={RolePermissions.EDIT} roles={["ADMIN"]}>
        <AddUpdateRole
          key={role?.id ?? "edit"}
          open={editModal.isOpen}
          onOpenChange={editModal.close}
          item={role ?? null}
        />
      </PermissionGuard>

      <PermissionGuard permissions={RolePermissions.DELETE} roles={["ADMIN"]}>
        <ConfirmDialog
          open={deleteModal.isOpen}
          onOpenChange={deleteModal.close}
          onConfirm={confirmDelete}
          title="Delete Role"
          description={`Are you sure you want to delete "${role?.displayName}"? This action cannot be undone and will remove this role from all assigned users.`}
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
          isLoading={isDeleting}
        />
      </PermissionGuard>

      <PermissionGuard permissions={RolePermissions.ASSIGN} roles={["ADMIN"]}>
        <AssignAdminRoleModal
          key={`assign-${role?.id ?? "assign"}`}
          open={assignModal.isOpen}
          onOpenChange={assignModal.close}
          item={role ?? null}
        />
      </PermissionGuard>

      <ConfirmDialog
        open={removeRoleModal.isOpen}
        onOpenChange={removeRoleModal.close}
        onConfirm={confirmRemoveRole}
        title="Remove Role"
        description={`Are you sure you want to remove "${role?.displayName}" role from "${removeRoleModal.data?.username}"?`}
        confirmText="Remove"
        cancelText="Cancel"
        variant="danger"
        isLoading={isRemoving}
      />

      {/* Header Card */}
      <Card className="glass border-border/50 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-primary/5 via-transparent to-info/5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Button
                  variant="glass"
                  size="sm"
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                  onClick={handleBack}
                >
                  Back
                </Button>
              </div>

              {isLoading ? (
                <Skeleton className="h-8 w-64 mb-2" />
              ) : (
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                  {role?.displayName}
                </CardTitle>
              )}

              {isLoading ? (
                <Skeleton className="h-4 w-96 mt-2" />
              ) : (
                <CardDescription className="text-base mt-2">
                  {role?.description || "No description provided"}
                </CardDescription>
              )}

              <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
                {isLoading ? (
                  <>
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-32" />
                  </>
                ) : (
                  <>
                    <div>
                      <span className="font-medium">Created:</span>{" "}
                      {formatDate(role?.createdAt)}
                    </div>
                    <div>
                      <span className="font-medium">Updated:</span>{" "}
                      {formatDate(role?.updatedAt)}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {canEdit && !isLoading && (
                <Button
                  variant="glass"
                  size="sm"
                  leftIcon={<Edit className="w-4 h-4" />}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
              )}
              {canAssign && !isLoading && (
                <Button
                  variant="glass"
                  size="sm"
                  leftIcon={<UserPlus className="w-4 h-4" />}
                  onClick={handleAssign}
                >
                  Assign Users
                </Button>
              )}
              {canDelete && !isLoading && (
                <Button
                  variant="glass"
                  color="danger"
                  size="sm"
                  leftIcon={<Trash2 className="w-4 h-4" />}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Permissions Card */}
      <Card className="glass border-border/50 shadow-xl">
        <CardHeader className="border-b border-border">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <CardTitle>Permissions</CardTitle>
            <Badge variant="secondary">{role?.permissions?.length || 0}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : Object.keys(groupedPermissions).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(groupedPermissions).map(([entity, perms]) => (
                <PermissionCard
                  key={entity}
                  entity={entity}
                  permissions={perms}
                >
                  <PermissionBadges
                    permissions={perms}
                    maxDisplay={10}
                    size="sm"
                  />
                </PermissionCard>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No permissions"
              description="This role has no permissions assigned."
            />
          )}
        </CardContent>
      </Card>

      {/* Assigned Users Card */}
      <Card className="glass border-border/50 shadow-xl">
        <CardHeader className="border-b border-border flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <CardTitle>Assigned Users</CardTitle>
              <Badge variant="secondary">{pagination.total}</Badge>
            </div>
          </div>

          <div className="w-full flex justify-between gap-2 items-baseline">
            <QueryParamSearch
              paramName="search"
              debounceDelay={500}
              placeholder="Search name, email..."
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
          <div className="overflow-hidden rounded-b-xl">
            <Table>
              <TableHeader>
                <TableRow>
                  {/* <TableHead>Username</TableHead> */}

                  <TableSortableHead
                    sortDirection={getSortDirection("username")}
                    onSort={() => requestSort("username")}
                  >
                    Username
                  </TableSortableHead>
                  <TableSortableHead
                    sortDirection={getSortDirection("email")}
                    onSort={() => requestSort("email")}
                  >
                    Email
                  </TableSortableHead>
                  {/* <TableHead>Role</TableHead> */}
                  {/* <TableHead>Assigned At</TableHead> */}

                  <TableSortableHead
                    sortDirection={getSortDirection("createdAt")}
                    onSort={() => requestSort("createdAt")}
                  >
                    Assigned At
                  </TableSortableHead>
                  <TableHead>Assigned By</TableHead>
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
                ) : users && users.length > 0 ? (
                  users.map((user: any) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.username}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.email || "—"}
                      </TableCell>
                      {/* <TableCell> */}
                      {/* <Badge variant="secondary" size="sm"> */}
                      {/*   {user.role} */}
                      {/* </Badge> */}
                      {/* </TableCell> */}
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {formatDate(user.assignedAt)}
                      </TableCell>
                      <TableCell>
                        <UserChip
                          user={user.assignedBy}
                          size="sm"
                          showAvatar
                          showRole
                          clickable={canViewUsers}
                          onUserClick={handleViewUser}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <TableActionButtons
                          item={user}
                          actions={[
                            {
                              key: `view-${user.id}`,
                              label: "View User",
                              icon: Users,
                              onClick: (item: any) => handleViewUser(item.id),
                              visible: canViewUsers,
                            },
                            {
                              key: `remove-${user.id}`,
                              label: "Remove Role",
                              icon: XCircle,
                              onClick: (item: any) =>
                                handleRemoveRole(item.id, item.username),
                              visible: canAssign,
                              variant: "danger",
                              loading:
                                isRemoving &&
                                removeRoleModal.data?.userId === user.id,
                            },
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={6} className="h-32">
                      <EmptyState
                        title="No users assigned"
                        description={
                          canAssign
                            ? "Click the 'Assign Users' button to add users to this role."
                            : "No users have been assigned to this role yet."
                        }
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {/* {pagination.totalPages > 1 && ( */}
          {/*   <div className="flex items-center justify-between px-6 py-4 border-t border-border"> */}
          {/*     <div className="text-sm text-muted-foreground"> */}
          {/*       Showing page {pagination.page} of {pagination.totalPages} ( */}
          {/*       {pagination.total} total users) */}
          {/*     </div> */}
          {/*     <Pagination */}
          {/*       currentPage={pagination.page} */}
          {/*       totalPages={pagination.totalPages} */}
          {/*       onPageChange={setPage} */}
          {/*       showFirstLast */}
          {/*     /> */}
          {/*   </div> */}
          {/* )} */}
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
        </CardContent>
      </Card>
    </Container>
  );
};

export default RoleDetailPage;
