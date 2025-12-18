import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { AdminGenresAPI } from "@/modules/authenticated/features/Genres/api/admin-genres.api";
import { AdminAllGenreQueryKey } from "./admin-genere.query.key";
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

export const useAdminAddGenre = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AdminGenresAPI.addGenre,
    onSuccess: () => {
      return refreshQueryClient(queryClient);
    },
  });
};

export const useSolfDeleteGenre = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AdminGenresAPI.solfDeleteGenre,
    onSuccess: () => {
      return refreshQueryClient(queryClient);
    },
    onError: (err: any) => {
      console.error("Failed to delete genre:", err);
    },
  });
};

export const usePermanentDeleteGenre = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AdminGenresAPI.permanentDeleteGenre,
    onSuccess: () => {
      return refreshQueryClient(queryClient);
    },
  });
};

export const useDeletedGenreRestore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AdminGenresAPI.restoreDeletedGenre,
    onSuccess: () => {
      return refreshQueryClient(queryClient);
    },
  });
};
const refreshQueryClient = (queryClient: QueryClient) => {
  // Return the promise so the caller can await it
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: ["genres"], exact: false }),
    queryClient.invalidateQueries({
      queryKey: ["public", "genres"],
      exact: false,
    }),
    queryClient.invalidateQueries({
      queryKey: ["admin", "genres"],
      exact: false,
    }),
  ]);
};
