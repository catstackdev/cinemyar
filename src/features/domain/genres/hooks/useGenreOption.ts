import { PublicGenresOptionsQueryKey } from "../api/genere.query.key";
import type { GenreOptionParams } from "@/shared/types/types";
import { PublicGenresAPI } from "../api/genres.api";
import { useQuery } from "@tanstack/react-query";

//
export const useGenreOption = (params: GenreOptionParams) => {
  const queryKey = PublicGenresOptionsQueryKey(params);
  return useQuery({
    queryKey: queryKey,
    queryFn: () => PublicGenresAPI.getGenresOptions(params),
    // staleTime: 30 * Time.MINUTE,
  });
};
