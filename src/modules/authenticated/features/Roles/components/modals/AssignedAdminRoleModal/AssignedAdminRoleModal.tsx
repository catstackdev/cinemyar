import React, { useMemo, useState } from "react";
import type { AssignedAdminRoleModalProps } from "./AssignedAdminRoleModal.types";
import { PermissionBadges } from "@/components/common";
import {
  LoadingOverlay,
  TableHeader,
  TableRow,
  TableSortableHead,
  TableHead,
  TableBody,
  TableCell,
  Button,
  EmptyState,
  Pagination,
  Table,
  JumpingDots,
} from "@/components/ui";
import {
  ModalRoot,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/Modal";
import { useDebounce } from "@/hooks";
import {
  AdminUserAdminsQueryKey,
  AdminUserAdminsApi,
} from "@/modules/authenticated/features/Users/api";
import type { AdminUserListParams } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { Search, UserMinus, UserPlus } from "lucide-react";
import AdminRoleFilterState from "../../AdminRoleFilterState";
import { useAdminRemoveRole } from "../../../hooks/useAdminRoles";

const AssignedAdminRoleModal: React.FC<AssignedAdminRoleModalProps> = ({
  open,
  item,
  onOpenChange,
}) => {
  const { mutate: unAssignAdminRole, isPending: isUnAssigning } =
    useAdminRemoveRole();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sortBy, setSortBy] =
    useState<AdminUserListParams["sortBy"]>("username");
  const [orderBy, setOrderBy] = useState<AdminUserListParams["orderBy"]>("asc");
  const [filters, setFilters] = useState<Record<string, string>>({});

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
      exceptdynamicRoleId: filters.dynamicRoleId || undefined,
      dynamicRoleId: item?.id || undefined,

      isBanned:
        filters.isBanned === "true"
          ? true
          : filters.isBanned === "false"
            ? false
            : undefined,
    }),
    [debouncedSearch, page, limit, sortBy, orderBy, filters],
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

  // Reset filters when modal opens
  React.useEffect(() => {
    if (open) {
      setSearch("");
      setPage(1);
      setSortBy("username");
      setOrderBy("asc");
      setFilters({});
    }
  }, [open]);

  // Handle filter changes from AdminRoleFilterState
  const handleFilterChange = (newFilters: Record<string, string>) => {
    console.log("[AssignAdminRoleModal] Filter changed:", newFilters);

    // Extract sortBy and orderBy from filters
    if (newFilters.sortBy) {
      setSortBy(newFilters.sortBy as AdminUserListParams["sortBy"]);
    }
    if (newFilters.orderBy) {
      setOrderBy(newFilters.orderBy as AdminUserListParams["orderBy"]);
    }

    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const handleClose = () => {
    onOpenChange?.(false);
  };

  const handleUnAssignRole = (userId: string) => {
    userId &&
      item?.id &&
      unAssignAdminRole({
        id: userId,
        roleId: item.id,
      });
    // TODO: Implement role assignment logic
    console.log(`Assigning role ${item?.id} to user ${userId}`);
  };

  const handleSort = (column: AdminUserListParams["sortBy"]) => {
    const newOrderBy =
      sortBy === column ? (orderBy === "asc" ? "desc" : "asc") : "asc";

    setSortBy(column);
    setOrderBy(newOrderBy);

    // Sync with filters to keep filter dropdown in sync
    setFilters((prev) => {
      const updated = { ...prev };
      if (column) {
        updated.sortBy = column;
      }
      updated.orderBy = newOrderBy;
      return updated;
    });
  };

  const getSortDirection = (column: string): "asc" | "desc" | null => {
    return sortBy === column ? (orderBy as "asc" | "desc") : null;
  };

  return (
    <ModalRoot open={open} onOpenChange={onOpenChange}>
      <ModalContent
        className="border border-primary/50"
        size="4xl"
        zIndex={100}
      >
        <ModalHeader className="pr-16">Assigned Admin Role</ModalHeader>

        <LoadingOverlay isLoading={isLoading}>
          <ModalBody className="relative p-0 overflow-hidden flex flex-col h-[600px]">
            <div className="flex flex-col h-full min-h-[calc(100vh-190px)]">
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
                  <AdminRoleFilterState
                    onFilterChange={handleFilterChange}
                    defaultValues={filters}
                  />
                </div>
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
                              {user.adminRoles?.map((userRole) => (
                                <span
                                  key={userRole.roleId}
                                  className="text-xs px-2 py-1 bg-primary/10 rounded"
                                >
                                  {userRole.role.displayName}
                                </span>
                              ))}
                              {(!user.adminRoles ||
                                user.adminRoles?.length === 0) && (
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
                              color="danger"
                              size="sm"
                              variant="glass"
                              leftIcon={<UserMinus className="w-4 h-4" />}
                              onClick={() => handleUnAssignRole(user.id)}
                              disabled={isUnAssigning}
                              rightIcon={isUnAssigning && <JumpingDots />}
                            >
                              Unassign
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
                      Showing page {pagination.page} of {pagination.totalPages}{" "}
                      ({pagination.total} total users)
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
          </ModalBody>
        </LoadingOverlay>

        <ModalFooter className="border-t">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="glass" onClick={handleClose}>
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalRoot>
  );
};

export default AssignedAdminRoleModal;
