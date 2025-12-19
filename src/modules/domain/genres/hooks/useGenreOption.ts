import {
  PublicGenresDetailQueryKey,
  PublicGenresOptionsQueryKey,
} from "../api/genere.query.key";
import type { GenreOptionParams } from "@/shared/types/types";
import { PublicGenresAPI } from "../api/genres.api";
import { useQuery } from "@tanstack/react-query";
import { Time } from "@/shared/types/constants/time.const";

//
export const useGenreOption = (params: GenreOptionParams) => {
  const queryKey = PublicGenresOptionsQueryKey(params);
  return useQuery({
    queryKey: queryKey,
    queryFn: () => PublicGenresAPI.getGenresOptions(params),
    // staleTime: 30 * Time.MINUTE,
  });
};

export const useGenreDetail = (id?: string) => {
  return useQuery({
    queryKey: id ? PublicGenresDetailQueryKey(id) : [],
    queryFn: () => PublicGenresAPI.getGenre(id!),
    enabled: Boolean(id),
    staleTime: 30 * Time.MINUTE,
  });
};
