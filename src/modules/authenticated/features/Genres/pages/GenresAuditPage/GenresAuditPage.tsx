import React, { useMemo, useCallback } from "react";
import type { GenresAuditPageProps } from "./GenresAuditPage.types";
import type {
  GenreAuditPaginatedParams,
  GenreAuditResponseData,
} from "@/shared/types/audit/genre-audit.types";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { AdminAuditApi, AdminAuditQueryKey } from "@/modules/domain/audit/api";
import type { ApiResponse } from "@/shared/types";
import {
  Card,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Badge,
  EmptyState,
  Pagination,
  Table,
  Container,
} from "@/components/ui";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { cn, formatDate } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { useParamUpdate } from "@/hooks";
import { UserChip } from "@/components/common";
import { GenresAuditFilter } from "../../components";

const GenresAuditPage: React.FC<GenresAuditPageProps> = ({ children }) => {
  const navigate = useNavigate();
  const initialData = useLoaderData<ApiResponse<GenreAuditResponseData>>();
  const [searchParams] = useSearchParams();
  const { updateParams: updateUrlParams } = useParamUpdate();

  // Parse URL params
  const params: GenreAuditPaginatedParams = useMemo(
    () => ({
      orderBy:
        (searchParams.get("orderBy") as GenreAuditPaginatedParams["orderBy"]) ||
        "asc",
      page: Number(searchParams.get("page") || "1"),
      limit: Number(searchParams.get("limit") || "10"),
      action: searchParams.get("action") || undefined,
      userId: searchParams.get("userId") || undefined,
      genreId: searchParams.get("genreId") || undefined,
    }),
    [searchParams],
  );

  // Fetch data with React Query
  const { data: response, isLoading } = useQuery({
    queryKey: AdminAuditQueryKey("genres", params),
    queryFn: () => AdminAuditApi.getGenreAudits(params),
    initialData,
  });

  // Extract data and pagination
  const data = response?.data?.data ?? [];
  const pagination = response?.data?.meta ?? {
    total: 0,
    page: params.page,
    limit: params.limit,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };

  // Page change handler
  const handlePageChange = useCallback(
    (page: number) => {
      updateUrlParams({ page });
    },
    [updateUrlParams],
  );

  const getActionBadgeVariant = (action: string) => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes("create")) return "success";
    if (actionLower.includes("update") || actionLower.includes("edit"))
      return "info";
    if (actionLower.includes("delete") || actionLower.includes("remove"))
      return "danger";
    if (actionLower.includes("publish")) return "success";
    if (actionLower.includes("unpublish")) return "warning";
    return "secondary";
  };

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
                Genre Audit Log
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                View all changes made to genres
              </CardDescription>
            </div>
          </div>

          {/* Filter options can be added here */}
          <div className="w-full flex justify-between gap-2 items-baseline">
            {/* Future: Add action filter, user filter, date range filter */}
          </div>
        </CardHeader>

        <CardContent className="!p-0">
          <div className="w-full p-4 space-y-4">
            <GenresAuditFilter filters={response?.data?.filters} />
          </div>
          <div className="w-full overflow-hidden rounded-b-xl h-full bg-card/30 backdrop-blur-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Genre</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Performed By</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Expires</TableHead>
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
                ) : data && data.length > 0 ? (
                  data.map((entry) => (
                    <TableRow key={entry.id} className="cursor-pointer">
                      {/* Genre Info */}
                      <TableCell>
                        <div className="flex flex-col">
                          <span
                            className={cn(
                              "font-medium whitespace-nowrap",
                              entry.genre?.id &&
                                "hover:underline hover:text-primary",
                            )}
                            onClick={() =>
                              entry.genre?.id &&
                              navigate(
                                `/authenticated/genres/${entry.genre.id}`,
                              )
                            }
                          >
                            {entry.genre.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {entry.genre.slug}
                          </span>
                        </div>
                      </TableCell>

                      {/* Action */}
                      <TableCell>
                        <Badge
                          variant={getActionBadgeVariant(entry.action)}
                          size="sm"
                        >
                          {entry.action}
                        </Badge>
                        {entry.metadata?.version && (
                          <span className="ml-2 text-xs text-muted-foreground">
                            v{entry.metadata.version}
                          </span>
                        )}
                      </TableCell>

                      {/* Reason */}
                      <TableCell className="max-w-xs">
                        {entry.reason ? (
                          <span className="text-sm truncate block">
                            {entry.reason}
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            —
                          </span>
                        )}
                      </TableCell>

                      {/* User */}
                      <TableCell>
                        <UserChip
                          user={entry.user}
                          size="sm"
                          showAvatar
                          showEmail
                        />
                      </TableCell>

                      {/* Created At */}
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {formatDate(entry.createdAt)}
                      </TableCell>

                      {/* Expires At */}
                      <TableCell className="font-mono text-sm">
                        {entry.expiresAt ? (
                          <span className="text-warning">
                            {formatDate(entry.expiresAt)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">Never</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={6} className="h-32">
                      <EmptyState
                        title="No audit entries found"
                        description="No changes have been recorded for genres yet."
                      />
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
                {pagination.total} total entries)
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

export default GenresAuditPage;
