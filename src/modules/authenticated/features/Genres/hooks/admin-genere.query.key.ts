import type { GenrePaginationParams } from "@/shared/types/types";

export const AdminAllGenreQueryKey = (params?: GenrePaginationParams) => [
  "admin",
  "genres",
  params,
];

export const AdminAllDeletedGenreQueryKey = (
  params?: GenrePaginationParams,
) => ["admin", "genres", "deleted", params];
