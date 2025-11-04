import { categoriesAPI } from "@/api/categories.api";
import { queryClient } from "@/contexts/AppProviders";

export const categoryDetailLoader = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  if (!id) {
    throw new Error("Category ID is required");
  }

  return await queryClient.ensureQueryData({
    queryKey: ["categories", id],
    queryFn: () => categoriesAPI.getCategory(id),
  });
};
