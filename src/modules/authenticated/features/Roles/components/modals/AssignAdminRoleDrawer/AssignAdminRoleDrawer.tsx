import React, { useState, useMemo } from "react";
import type { AssignAdminRoleDrawerProps } from "./AssignAdminRoleDrawer.types";
import {
  DrawerRoot,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/Drawer";
import {
  Button,
  EmptyState,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSortableHead,
} from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import {
  AdminUserAdminsQueryKey,
  AdminUserAdminsApi,
} from "@/modules/authenticated/features/Users/api";
import type { AdminUserListParams } from "@/shared/types";
import { PermissionBadges } from "@/components/common";
import { UserPlus, Search, Filter } from "lucide-react";
import { useDebounce } from "@/hooks";
import { useAdminRoleOptions } from "@/modules/authenticated/features/Roles/hooks/useAdminRoles";

const AssignAdminRoleDrawer: React.FC<AssignAdminRoleDrawerProps> = ({
  onOpenChange,
  open,
  item,
}) => {
  // Local state (NO URL params!) - drawer-specific only
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sortBy, setSortBy] =
    useState<AdminUserListParams["sortBy"]>("username");
  const [orderBy, setOrderBy] = useState<AdminUserListParams["orderBy"]>("asc");
  const [dynamicRoleId, setDynamicRoleId] = useState<string>("");
  const [exceptdynamicRoleId, setExceptdynamicRoleId] = useState<string>("");
  const [isBanned, setIsBanned] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch role options for filters
  const { data: roleOptions, isLoading: rolesLoading } = useAdminRoleOptions({
    enabled: open,
  });

  // Debounce search to avoid too many API calls
  const debouncedSearch = useDebounce(search, 500);

  // Build params object
  const params: AdminUserListParams = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      page,
      limit,
      sortBy,
      orderBy,
      dynamicRoleId: dynamicRoleId || undefined,
      exceptdynamicRoleId: exceptdynamicRoleId || undefined,
      isBanned:
        isBanned === "true" ? true : isBanned === "false" ? false : undefined,
    }),
    [
      debouncedSearch,
      page,
      limit,
      sortBy,
      orderBy,
      dynamicRoleId,
      exceptdynamicRoleId,
      isBanned,
    ],
  );

  // Fetch data with React Query
  const { data: response, isLoading } = useQuery({
    queryKey: [...AdminUserAdminsQueryKey(params), "drawer"], // Add "drawer" to avoid cache collision
    queryFn: () => AdminUserAdminsApi.getUserAdmins(params),
    enabled: open, // Only fetch when drawer is open
  });

  const data = response?.data?.data ?? [];
  const pagination = response?.data?.meta ?? {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };

  // Reset filters when drawer opens
  React.useEffect(() => {
    if (open) {
      setSearch("");
      setPage(1);
      setSortBy("username");
      setOrderBy("asc");
      setDynamicRoleId("");
      setExceptdynamicRoleId("");
      setIsBanned("");
      setShowFilters(false);
    }
  }, [open]);

  const handleClose = () => {
    onOpenChange?.(false);
  };

  const handleAssignRole = (userId: string) => {
    // TODO: Implement role assignment logic
    console.log(`Assigning role ${item?.id} to user ${userId}`);
  };

  const handleSort = (column: AdminUserListParams["sortBy"]) => {
    if (sortBy === column) {
      // Toggle order if same column
      setOrderBy(orderBy === "asc" ? "desc" : "asc");
    } else {
      // New column, default to asc
      setSortBy(column);
      setOrderBy("asc");
    }
  };

  const getSortDirection = (column: string): "asc" | "desc" | null => {
    return sortBy === column ? (orderBy as "asc" | "desc") : null;
  };

  return (
    <DrawerRoot open={open} onOpenChange={onOpenChange}>
      <DrawerContent side="right" size="full">
        <DrawerHeader>
          <DrawerTitle>Assign "{item?.displayName}" Role</DrawerTitle>
          <DrawerDescription>
            Select users to assign the "{item?.displayName}" role. Users will
            gain all permissions associated with this role.
          </DrawerDescription>
        </DrawerHeader>

        <DrawerBody className="p-0">
          <div className="flex flex-col h-full">
            {/* Search & Filter Section - Local State */}
            <div className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4 space-y-3">
              {/* Search Bar */}
              <div className="flex gap-2 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
                  <input
                    type="text"
                    placeholder="Search by username or email..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1); // Reset to first page on search
                    }}
                    className="w-full pl-9 pr-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  leftIcon={<Filter className="w-4 h-4" />}
                >
                  Filters
                </Button>
              </div>

              {/* Filter Dropdowns */}
              {showFilters && (
                <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                  {/* Dynamic Role Filter */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">
                      Has Role
                    </label>
                    <select
                      value={dynamicRoleId}
                      onChange={(e) => {
                        setDynamicRoleId(e.target.value);
                        setPage(1);
                      }}
                      disabled={rolesLoading}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    >
                      <option value="">All Roles</option>
                      {roleOptions?.data
                        ?.filter((role) => role.id !== exceptdynamicRoleId)
                        .map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.displayName}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Except Dynamic Role Filter */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">
                      Except Role
                    </label>
                    <select
                      value={exceptdynamicRoleId}
                      onChange={(e) => {
                        setExceptdynamicRoleId(e.target.value);
                        setPage(1);
                      }}
                      disabled={rolesLoading}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    >
                      <option value="">None</option>
                      {roleOptions?.data
                        ?.filter((role) => role.id !== dynamicRoleId)
                        .map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.displayName}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Ban Status Filter */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">
                      Ban Status
                    </label>
                    <select
                      value={isBanned}
                      onChange={(e) => {
                        setIsBanned(e.target.value);
                        setPage(1);
                      }}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    >
                      <option value="">All Users</option>
                      <option value="false">Not Banned</option>
                      <option value="true">Banned</option>
                    </select>
                  </div>

                  {/* Sort Order Filter */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">
                      Sort Order
                    </label>
                    <select
                      value={orderBy}
                      onChange={(e) => {
                        setOrderBy(e.target.value as "asc" | "desc");
                      }}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    >
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Table Section */}
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableSortableHead
                      sortDirection={getSortDirection("username")}
                      onSort={() => handleSort("username")}
                    >
                      Username
                    </TableSortableHead>
                    <TableSortableHead
                      sortDirection={getSortDirection("email")}
                      onSort={() => handleSort("email")}
                    >
                      Email
                    </TableSortableHead>
                    <TableHead>Current Roles</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow className="hover:bg-transparent">
                      <TableCell colSpan={5} className="h-32 text-center">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : data && data.length > 0 ? (
                    data.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.username}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.dynamicRoles?.map((dynamic, index) => (
                              <span
                                key={dynamic.roleId}
                                className="text-xs px-2 py-1 bg-primary/10 rounded"
                              >
                                {dynamic.role.displayName}
                                {index < user.dynamicRoles.length - 1
                                  ? ", "
                                  : ""}
                              </span>
                            ))}
                            {(!user.dynamicRoles ||
                              user.dynamicRoles.length === 0) && (
                              <span className="text-xs text-muted-foreground">
                                No roles
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <PermissionBadges
                            permissions={user.permissions}
                            maxDisplay={3}
                            size="sm"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="glass"
                            leftIcon={<UserPlus className="w-4 h-4" />}
                            onClick={() => handleAssignRole(user.id)}
                          >
                            Assign
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="hover:bg-transparent">
                      <TableCell colSpan={5} className="h-32">
                        <EmptyState
                          title="No users found"
                          description={
                            search
                              ? `No users match "${search}"`
                              : "Start searching to find users"
                          }
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="sticky bottom-0 bg-background border-t border-border px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing page {pagination.page} of {pagination.totalPages} (
                    {pagination.total} total users)
                  </div>
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={setPage}
                    showFirstLast
                  />
                </div>
              </div>
            )}
          </div>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="glass" onClick={handleClose}>
            Done
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default AssignAdminRoleDrawer;
