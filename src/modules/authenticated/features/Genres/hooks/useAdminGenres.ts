import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { AdminGenresAPI } from "@/modules/authenticated/features/Genres/api/admin-genres.api";
import {
  AdminAllGenreQueryKey,
  AdminGenreQueryKey,
} from "./admin-genere.query.key";
import { Time } from "@/shared/constants/time.const";
import type { GenrePaginationParams } from "@/shared/types";
import type { UpdateGenreFormData } from "@/schemas/movie.schema";

//
export const useAdminGenres = (params: GenrePaginationParams) => {
  const queryKey = AdminAllGenreQueryKey(params);
  return useQuery({
    queryKey: queryKey,
    queryFn: () => AdminGenresAPI.getGenres(params),
    staleTime: 5 * Time.MINUTE,
  });
};
export const useAdminGenre = (id?: string) => {
  const queryKey = id ? AdminGenreQueryKey(id) : [];
  return useQuery({
    queryKey: queryKey,
    queryFn: () => AdminGenresAPI.getGenre(id!),
    enabled: Boolean(id),
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

export const useAdminUpdateGenre = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<UpdateGenreFormData>;
    }) => AdminGenresAPI.updateGenre(id, data),
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
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      AdminGenresAPI.permanentDeleteGenre(id, reason),
    onSuccess: () => {
      return refreshQueryClient(queryClient);
    },
  });
};

export const usePermanentDeleteAllGenre = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reason }: { reason: string }) =>
      AdminGenresAPI.permanentDeleteAllGenre(reason),
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

export const useDeletedGenreAllRestore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AdminGenresAPI.restoreAllDeletedGenre,
    onSuccess: () => {
      return refreshQueryClient(queryClient);
    },
  });
};

const GENRE_QUERY_KEYS = [
  ["genres"],
  ["public", "genres"],
  ["admin", "genres"],
];

const refreshQueryClient = (queryClient: QueryClient) => {
  return Promise.all(
    GENRE_QUERY_KEYS.map((key) =>
      queryClient.invalidateQueries({ queryKey: key, exact: false }),
    ),
  );
};
// const refreshQueryClient = (queryClient: QueryClient) => {
//   // Return the promise so the caller can await it
//   return Promise.all([
//     queryClient.invalidateQueries({ queryKey: ["genres"], exact: false }),
//     queryClient.invalidateQueries({
//       queryKey: ["public", "genres"],
//       exact: false,
//     }),
//     queryClient.invalidateQueries({
//       queryKey: ["admin", "genres"],
//       exact: false,
//     }),
//   ]);
// };
