import { categoriesAPI } from "@/api/categories.api";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoriesAPI.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
