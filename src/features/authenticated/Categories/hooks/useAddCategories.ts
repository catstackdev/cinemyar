import { addCategory } from "@/api/categories.api";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
