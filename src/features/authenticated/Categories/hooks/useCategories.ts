// import { useQuery } from "@tanstack/react-query";
// import { categoriesAPI } from "@/api/categories.api";
// import { moviesQueryKey } from "./categoriesQueryKey";
//
// interface UseMoviesProps {
//   page: number;
//   limit?: number;
//   search?: string;
// }
//
// export const useMovies = ({
//   page,
//   limit = 20,
//   search = "",
// }: UseMoviesProps) => {
//   return useQuery({
//     queryKey: moviesQueryKey({ page, limit, search }),
//     queryFn: () => categoriesAPI.getCategories(),
//   });
// };
