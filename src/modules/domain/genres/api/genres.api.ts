import { apiClient } from "@/lib/axios";
import type {
  AdminGenreSerialized,
  ApiResponse,
  GenreOptionParams,
} from "@/shared/types/types";
import type { PublicGenresOptionsApiResponse } from "@/shared/types/types/genre";

// Centralized API handlers
export const PublicGenresAPI = {
  // genres Options
  getGenresOptions: async (
    params?: GenreOptionParams,
  ): Promise<PublicGenresOptionsApiResponse> => {
    const { data } = await apiClient.get<PublicGenresOptionsApiResponse>(
      "genres/options",
      { params },
    );
    return data;
  },

  getGenre: async (id: string): Promise<ApiResponse<AdminGenreSerialized>> => {
    const { data } = await apiClient.get<ApiResponse<AdminGenreSerialized>>(
      `/genres/${id}`,
    );
    return data;
  },

  // getGenres: async (flat: boolean = false): Promise<ApiResponse<AdminGenreSerialized>> => {
  //   const { data } = await apiClient.get<ApiResponse<AdminGenreSerialized>>(`/genres/${id}`);
  //   return data;
  // },
};
