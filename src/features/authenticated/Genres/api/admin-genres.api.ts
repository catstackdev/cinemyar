import { apiClient } from "@/lib/axios";
import type {
  AdminGenresApiResponse,
  GenrePaginationParams,
} from "@/shared/types/types";

// Centralized API handlers
export const AdminGenresAPI = {
  // All genres
  getGenres: async (
    params?: GenrePaginationParams,
  ): Promise<AdminGenresApiResponse> => {
    const { data } = await apiClient.get<AdminGenresApiResponse>(
      "admin/genres",
      { params },
    );
    return data;
  },

  // getGenre: async (id: string): Promise<ResponseType<Genre>> => {
  //   const { data } = await apiClient.get<ResponseType<Genre>>(`/genres/${id}`);
  //   return data;
  // },
  //
  // addGenre: async (data: AddGenreFormData): Promise<ResponseType<Genre>> => {
  //   const { data: res } = await apiClient.post<ResponseType<Genre>>("/genres", data);
  //   return res;
  // },
  //
  // updateGenre: async (
  //   id: string,
  //   data: Partial<UpdateGenreFormData>
  // ): Promise<ResponseType<Genre>> => {
  //   const { data: res } = await apiClient.patch<ResponseType<Genre>>(`/genres/${id}`, data);
  //   return res;
  // },
  //
  // deleteGenre: async (id: string): Promise<ResponseType<any>> => {
  //   const { data } = await apiClient.delete<ResponseType<any>>(`/genres/${id}`);
  //   return data;
  // },
  //
  // // Staged images
  // getStagedImages: async (): Promise<ResponseType<GenreResponse>> => {
  //   const { data } = await apiClient.get("/genres/staged-images");
  //   return data;
  // },
  // approveImage: async (id: string) => apiClient.patch(`/genres/images/${id}/approve`),
  // publishImage: async (id: string) => apiClient.patch(`/genres/images/${id}/publish`),
  // rejectImage: async (id: string) => apiClient.patch(`/genres/images/${id}/reject`),
  //
  // // Deleted genres
  // getDeletedGenres: async (): Promise<ResponseType<GenreResponse>> => {
  //   const { data } = await apiClient.get("/genres/deleted");
  //   return data;
  // },
  // restoreGenre: async (id: string) => apiClient.patch(`/genres/${id}/restore`),
  // deleteGenrePermanent: async (id: string) => apiClient.delete(`/genres/${id}/permanent`),
};
