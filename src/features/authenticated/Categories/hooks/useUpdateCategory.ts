import { updateCategory } from "@/api/categories.api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { AddCategoryFormData } from "@/schemas/movie.schema";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AddCategoryFormData> }) =>
      updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
