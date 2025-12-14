import { useQuery } from "@tanstack/react-query";

import { AdminGenresAPI } from "@/features/authenticated/Genres/api/admin-genres.api";
import { AdminAllGenreQueryKey } from "../hooks/admin-genere.query.key";
import { Time } from "@/shared/types/constants/time.const";
import type { GenrePaginationParams } from "@/shared/types/types";

//
export const useAdminGenres = (params: GenrePaginationParams) => {
  const queryKey = AdminAllGenreQueryKey(params);
  return useQuery({
    queryKey: queryKey,
    queryFn: () => AdminGenresAPI.getGenres(params),
    staleTime: 5 * Time.MINUTE,
  });
};
