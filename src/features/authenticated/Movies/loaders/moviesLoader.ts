import { queryClient } from "@/contexts/AppProviders";
import { moviesAPI } from "@/api/movies.api";

export const moviesQueryKey = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
}) => ["movies", params];

export const moviesLoader = async () => {
  const queryKey = moviesQueryKey({ page: 1, limit: 20 });
  
  return await queryClient.ensureQueryData({
    queryKey,
    queryFn: () => moviesAPI.getMovies({ page: 1, limit: 20 }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};