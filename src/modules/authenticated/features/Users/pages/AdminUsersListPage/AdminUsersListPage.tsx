import React, { useCallback } from "react";
import type { AdminUsersListPageProps } from "./AdminUsersListPage.types";
import {
  PermissionGuard,
  ConfirmDialog,
  TableActionButtons,
  PermissionBadges,
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
} from "@/components/ui";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { useModal, useCan, useCrudPage } from "@/hooks";
import { AdminUserPermissions, RolePermissions } from "@/shared/constants";
import type {
  ApiResponse,
  AdminUserListResponse,
  AdminUserListItem,
  AdminUserListParams,
} from "@/shared/types";
import { formatDate } from "@/utils/helpers";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { AdminUserAdminsQueryKey, AdminUserAdminsApi } from "../../api";
import { AdminUserAdminsFilter } from "./components";

const AdminUsersListPage: React.FC<AdminUsersListPageProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const initialData = useLoaderData<ApiResponse<AdminUserListResponse>>();
  const banModal = useModal<AdminUserListItem>();
  const unbanModal = useModal<void | AdminUserListItem>();

  const canBan = useCan({
    roles: ["ADMIN"],
    permissions: AdminUserPermissions.BAN,
  });
  const canUnBan = useCan({
    roles: ["ADMIN"],
    permissions: AdminUserPermissions.EDIT,
  });

  // // Delete mutation
  // const { mutate: solfDeleteItem, isPending: isSolfDeleting } =
  //   useAdminDeleteRole();

  const {
    data,
    isLoading,
    pagination,
    handlePageChange,
    requestSort,
    getSortDirection,
  } = useCrudPage<AdminUserListParams, AdminUserListItem>({
    queryKey: AdminUserAdminsQueryKey,
    queryFn: AdminUserAdminsApi.getUserAdmins,
    initialData,
    defaultParams: {
      orderBy: "asc",
      page: 1,
      limit: 10,
      search: undefined,
      sortBy: "username",
      dynamicRoleId: undefined,
      isBanned: undefined,
    },
    parseParams: (searchParams) => {
      const isBannedParam = searchParams.get("isBanned");
      return {
        search: searchParams.get("search") || undefined,
        parentId: searchParams.get("parentId") || undefined,
        sortBy:
          (searchParams.get("sortBy") as AdminUserListParams["sortBy"]) ||
          "username",
        orderBy:
          (searchParams.get("orderBy") as AdminUserListParams["orderBy"]) ||
          "asc",
        page: Number(searchParams.get("page") || "1"),
        limit: Number(searchParams.get("limit") || "10"),
        isBanned:
          isBannedParam === "true"
            ? true
            : isBannedParam === "false"
              ? false
              : undefined,
        dynamicRoleId: searchParams.get("dynamicRoleId") || undefined,
        exceptdynamicRoleId: searchParams.get("exceptdynamicRoleId") || undefined,
      };
    },
  });

  const handleRowClick = useCallback(
    (id: string) => {
      navigate(`/authenticated/users/${id}`);
    },
    [navigate],
  );

  //for delete modal
  const handleBanClick = useCallback(
    (item: AdminUserListItem, e: React.MouseEvent) => {
      e.stopPropagation();
      banModal.open(item);
    },
    [banModal],
  );
  const confirmBan = useCallback(() => {
    if (banModal.data) {
      // solfDeleteItem(banModal.data?.id, {
      //   onSuccess: () => {
      //     banModal.close();
      //   },
      // });
      banModal.close();
    }
  }, [banModal.data]);

  //eoc delete modal
  const handleUnbanClick = useCallback(
    (item: AdminUserListItem, e: React.MouseEvent) => {
      e.stopPropagation();
      console.log("🔐 AllGenresPage: Opening update modal for", item);
      item && unbanModal.open(item);
    },
    [unbanModal],
  );

  const handleModalClose = useCallback(
    (open: boolean) => {
      if (!open) {
        unbanModal.close();
      }
    },
    [unbanModal],
  );

  return (
    <Container size="full" className="relative p-4 min-h-full">
      {/* Modals with Permission Guards */}
      <PermissionGuard permissions={AdminUserPermissions.BAN} roles={["ADMIN"]}>
        <ConfirmDialog
          open={banModal.isOpen}
          onOpenChange={banModal.close}
          onConfirm={confirmBan}
          title="Delete Role"
          description={`Are you sure you want to ban "${banModal.data?.username}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
        />
        {/* isLoading={isSolfDeleting} */}
      </PermissionGuard>

      <Card className="w-full glass border-border/50 shadow-xl">
        <CardHeader
          divided
          className="flex rounded-t-lg flex-col gap-4 bg-gradient-to-r from-primary/5 via-transparent to-info/5"
        >
          <div className="flex flex-row items-center justify-between w-full">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                Admin Users Management
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Manage and organize your admins
              </CardDescription>
            </div>
            {/* {canBan && ( */}
            {/*   <Button */}
            {/*     leftIcon={<PlusIcon className="w-4 h-4" />} */}
            {/*     size="sm" */}
            {/*     variant="glass" */}
            {/*     className="shadow-md hover:shadow-lg transition-shadow" */}
            {/*     onClick={() => unbanModal.open()} */}
            {/*   > */}
            {/*     Add New Role */}
            {/*   </Button> */}
            {/* )} */}
          </div>

          {/* Search Bar */}
          <div className="w-full flex justify-between gap-2 items-baseline">
            <QueryParamSearch
              paramName="search"
              debounceDelay={500}
              placeholder="Search by username, email"
            />
            {/* <AdminGenresParamFilter /> */}
            <AdminUserAdminsFilter />
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
                    sortDirection={getSortDirection("username")}
                    onSort={() => requestSort("username")}
                  >
                    User Name
                  </TableSortableHead>

                  <TableSortableHead
                    sortDirection={getSortDirection("email")}
                    onSort={() => requestSort("email")}
                  >
                    Email
                  </TableSortableHead>
                  <TableHead>Roles</TableHead>
                  <PermissionGuard
                    permissions={RolePermissions.VIEW}
                    roles={["ADMIN"]}
                  >
                    <TableHead>Permissions</TableHead>
                  </PermissionGuard>

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
                        {item.username}
                      </TableCell>

                      <TableCell className="max-w-xs truncate text-muted-foreground group-hover:text-foreground">
                        {item.email}
                      </TableCell>
                      <TableCell className="max-w-md text-muted-foreground group-hover:text-foreground">
                        {/* <TruncatedText text={item.description} maxLength={30} /> */}
                        {item?.dynamicRoles?.map((dynamic, index) => (
                          <span key={dynamic.id}>
                            {dynamic.role.displayName}
                            {index < item.dynamicRoles.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </TableCell>

                      <PermissionGuard
                        permissions={RolePermissions.VIEW}
                        roles={["ADMIN"]}
                      >
                        <TableCell className="min-w-[200px]">
                          <PermissionBadges
                            permissions={item.permissions}
                            maxDisplay={4}
                            size="sm"
                          />
                        </TableCell>
                      </PermissionGuard>

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
                              key: `update-${item.id}`,
                              label: "Update",
                              icon: Edit,
                              onClick: handleUnbanClick,
                              visible: canUnBan,
                              variant: "success",
                            },
                            {
                              key: "delete",
                              label: "Delete",
                              icon: Trash2,
                              onClick: handleBanClick,
                              visible: canBan,
                              loading: banModal.data?.id === item.id,
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

export default AdminUsersListPage;
