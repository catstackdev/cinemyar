import type { AddNewMovieFormData } from "@/features/authenticated/Movies/components/AddNewMovieModal/schemas/AddNewMovie.schema";
import { apiClient } from "@/lib/axios";

export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  genre: string;
  rating: number;
  duration: number;
  posterUrl?: string;
  trailerUrl?: string;
}
export type MoviesResponse = Movie[];

// export interface MoviesResponse {
//   movies: Movie[];
//   total: number;
//   page: number;
//   limit: number;
// }

export const moviesAPI = {
  getMovies: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    genre?: string;
  }): Promise<MoviesResponse> => {
    const { data } = await apiClient.get<MoviesResponse>("/movies", {
      params,
    });
    return data;
  },

  getMovie: async (id: number): Promise<Movie> => {
    // const { data } = await apiClient.get<Movie>(`/movies/${id}`);
    // return data;
    return {
      id,
      title: `Movie ${id}`,
      description: `Description of movie ${id}`,
      releaseDate: "2022-01-01",
      genre: "Action",
      rating: 8.5,
      duration: 120,
      posterUrl: "https://via.placeholder.com/400x600",
      trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    };
  },
};

export const addMovie = async (data: AddNewMovieFormData) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value) formData.append(key, value as any);
  });
  const res = await apiClient.post("/movies", formData);
  return res.data;
};
