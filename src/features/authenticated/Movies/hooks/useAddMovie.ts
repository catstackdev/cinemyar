import { addMovie } from "@/api/movies.api";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useAddMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};
