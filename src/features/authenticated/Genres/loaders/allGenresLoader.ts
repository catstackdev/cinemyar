import { queryClient } from "@/contexts/AppProviders";
import { AdminGenresAPI } from "@/features/authenticated/Genres/api/admin-genres.api";
import { AdminAllGenreQueryKey } from "../hooks/admin-genere.query.key";
import type { LoaderFunctionArgs } from "react-router-dom";
import { Time } from "@/shared/types/constants/time.const";
import type { GenrePaginationParams } from "@/shared/types/types";

export const allGenresLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const params: GenrePaginationParams = {
    search: url.searchParams.get("search") || undefined,
    parentId: url.searchParams.get("parentId") || undefined,
    sortBy:
      (url.searchParams.get("sortBy") as GenrePaginationParams["sortBy"]) ||
      undefined,
    orderBy:
      (url.searchParams.get("orderBy") as GenrePaginationParams["orderBy"]) ||
      undefined,
    page: Number(url.searchParams.get("page") || "1"),
    limit: Number(url.searchParams.get("limit") || "10"),
  };

  const queryKey = AdminAllGenreQueryKey(params);

  return queryClient.ensureQueryData({
    queryKey,
    queryFn: () => AdminGenresAPI.getGenres(params),
    staleTime: 5 * Time.MINUTE,
    // keepPreviousData: true, // optional, smooth pagination
  });
};
