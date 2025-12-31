import { queryClient } from "@/contexts/AppProviders";
import { Time } from "@/shared/constants";
import type { LoaderFunctionArgs } from "react-router-dom";
import { AdminAuditQueryKey, AdminAuditApi } from "@/modules/domain/audit/api";
import type { GenrePaginationParams } from "@/shared/types";

export const genreAuditLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const params: GenrePaginationParams = {
    page: Number(url.searchParams.get("page") || "1"),
    limit: Number(url.searchParams.get("limit") || "20"),
    // Only include if they exist to keep Query Key clean
    ...(url.searchParams.get("action") && {
      action: url.searchParams.get("action") as any,
    }),
    ...(url.searchParams.get("userId") && {
      userId: url.searchParams.get("userId"),
    }),
    ...(url.searchParams.get("orderBy") && {
      orderBy: url.searchParams.get("orderBy") as any,
    }),
  };

  const queryKey = AdminAuditQueryKey("genres", params);

  return queryClient.ensureQueryData({
    queryKey,
    queryFn: () => AdminAuditApi.getGenreAudits(params),
    staleTime: 5 * Time.MINUTE,
  });
};
