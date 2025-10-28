import { moviesAPI } from "@/api/movies.api";
import { useQuery } from "@tanstack/react-query";
import { moviesQueryKey } from "../loaders/moviesLoader";

interface UseMoviesProps {
  page: number;
  limit?: number;
  search?: string;
}

export const useMovies = ({
  page,
  limit = 20,
  search = "",
}: UseMoviesProps) => {
  return useQuery({
    queryKey: moviesQueryKey({ page, limit, search }),
    queryFn: () => moviesAPI.getMovies({ page, limit: 20, search }),
    enabled: page !== 1 || search !== "",
  });
};
