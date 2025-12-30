import { queryClient } from "@/contexts/AppProviders";
import { AdminGenresAPI } from "../api/admin-genres.api";
import { AdminGenreQueryKey } from "../hooks/admin-genere.query.key";
import { Time } from "@/shared/constants/time.const";
import type { LoaderFunctionArgs } from "react-router-dom";

export const genresDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params; // Extract from path params
  if (!id) throw new Error("Genre ID is required");
  const queryKey = AdminGenreQueryKey(id);

  return await queryClient.ensureQueryData({
    queryKey,
    queryFn: () => AdminGenresAPI.getGenre(id),
    staleTime: 5 * Time.MINUTE,
  });
};
