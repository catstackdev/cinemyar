import { categoriesAPI } from "@/api/categories.api";
import { queryClient } from "@/contexts/AppProviders";
import { categoriesQueryKey } from "../hooks/categoriesQueryKey";

export const categoriesLoader = async () => {
  const queryKey = categoriesQueryKey({ page: 1, limit: 20 });

  return await queryClient.ensureQueryData({
    queryKey,
    queryFn: () => categoriesAPI.getCategories(),
    // staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
