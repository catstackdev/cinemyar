import { apiClient } from "@/lib/axios";
import type {
  AddGenreFormData,
  UpdateGenreFormData,
} from "@/schemas/movie.schema";
import type {
  AdminGenresApiResponse,
  AdminGenreSerialized,
  ApiResponse,
  GenrePaginationParams,
} from "@/shared/types/types";
import type {
  GenreMediaItem,
  GenreMediaType,
} from "@/shared/types/types/genre";
import type { GenreDetailData } from "@/shared/types/types/genre/genre-admin-detail.type";

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

  getDeletedGenres: async (
    params?: GenrePaginationParams,
  ): Promise<AdminGenresApiResponse> => {
    const { data } = await apiClient.get<AdminGenresApiResponse>(
      "admin/genres/deleted/list",
      { params },
    );
    return data;
  },

  getGenre: async (id: string): Promise<ApiResponse<GenreDetailData>> => {
    const { data } = await apiClient.get<ApiResponse<GenreDetailData>>(
      `admin/genres/${id}`,
    );
    return data;
  },
  //
  //
  addGenre: async (
    data: AddGenreFormData,
  ): Promise<ApiResponse<AdminGenreSerialized>> => {
    const { data: res } = await apiClient.post<
      ApiResponse<AdminGenreSerialized>
    >("/admin/genres", data);
    return res;
  },
  //
  updateGenre: async (
    id: string,
    data: Partial<UpdateGenreFormData>,
  ): Promise<ApiResponse<AdminGenreSerialized>> => {
    const { data: res } = await apiClient.put<
      ApiResponse<AdminGenreSerialized>
    >(`/admin/genres/${id}`, data);
    return res;
  },

  // uploadMedia: async (
  //   id: string,
  //   type: GenreMediaType,
  //   file: File,
  //   onProgress?: (percent: number) => void,
  // ): Promise<ApiResponse<GenreMediaItem>> => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //
  //   const { data: res } = await apiClient.post<ApiResponse<GenreMediaItem>>(
  //     `/admin/genres/${id}/images/${type}`,
  //     formData,
  //     {
  //       headers: { "Content-Type": "multipart/form-data" },
  //       onUploadProgress: (progressEvent) => {
  //         const percentCompleted = Math.round(
  //           (progressEvent.loaded * 100) / (progressEvent.total ?? 1),
  //         );
  //         if (onProgress) onProgress(percentCompleted);
  //       },
  //     },
  //   );
  //   return res;
  // },
  // approveMedia: async (
  //   id: string,
  //   type: GenreMediaType,
  //   version: number,
  // ): Promise<ApiResponse<any>> => {
  //   const { data } = await apiClient.post<ApiResponse<any>>(
  //     `/admin/genres/${id}/images/${type}/${version}/approve`,
  //   );
  //   return data;
  // },
  //
  solfDeleteGenre: async (id: string): Promise<ApiResponse<any>> => {
    const { data } = await apiClient.delete<ApiResponse<any>>(
      `/admin/genres/${id}`,
    );
    return data;
  },
  permanentDeleteGenre: async (
    id: string,
    reason?: string,
  ): Promise<ApiResponse<any>> => {
    const { data } = await apiClient.delete<ApiResponse<any>>(
      `/admin/genres/deleted/${id}/permanent`,
      {
        data: reason ? { reason } : {},
      },
    );
    return data;
  },
  permanentDeleteAllGenre: async (
    reason?: string,
  ): Promise<ApiResponse<any>> => {
    const { data } = await apiClient.delete<ApiResponse<any>>(
      `/admin/genres/deleted/all/permanent`,
      {
        data: reason ? { reason } : {},
      },
    );
    return data;
  },
  restoreDeletedGenre: async (id: string): Promise<ApiResponse<any>> => {
    const { data } = await apiClient.post<ApiResponse<any>>(
      `/admin/genres/deleted/${id}/restore`,
    );
    return data;
  },

  restoreAllDeletedGenre: async (): Promise<ApiResponse<any>> => {
    const { data } = await apiClient.post<ApiResponse<any>>(
      `/admin/genres/deleted/all/restore`,
    );
    return data;
  },

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
