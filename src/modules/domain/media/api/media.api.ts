import { apiClient } from "@/lib/axios";
import type { ApiResponse } from "@/shared/types";
import type {
  ApiMediaDelParam,
  ApiMediaGetParam,
  ApiMediaPostParam,
  MediaUploadApiParams,
} from "./media.types";

export const mediaAPI = {
  /**
   * Reusable Approval Endpoint
   * URL Pattern: /admin/:entityType/:id/:mediaType/:subType/:version/approve
   */

  uploadMedia: async ({
    entityType, // e.g., "genres", "movies", "actors"
    entityId, // UUID
    mediaType, // e.g., "images", "videos"
    subType, // e.g., "icon", "banner", "thumbnail"
    file,
    onProgress,
  }: MediaUploadApiParams): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    formData.append("file", file);

    const { data: res } = await apiClient.post<ApiResponse<any>>(
      `/admin/${entityType}/${entityId}/${mediaType}/${subType}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total ?? 1),
          );
          // if (onProgress)
          onProgress?.(percentCompleted);
        },
      },
    );
    return res;
  },
  postVersionMedia: async ({
    entityType, // e.g., "genres", "movies", "actors"
    entityId, // UUID
    mediaType, // e.g., "images", "videos"
    subType, // e.g., "icon", "banner", "thumbnail"
    version,
    action,
    ...payload
  }: ApiMediaPostParam): Promise<ApiResponse<any>> => {
    const resource = entityType.toLowerCase();
    const { data } = await apiClient.post<ApiResponse<any>>(
      `/admin/${resource}/${entityId}/${mediaType}/${subType}/${action}/${version}`,
      payload,
    );

    return data;
  },
  getVersionMedia: async ({
    entityType, // e.g., "genres", "movies", "actors"
    entityId, // UUID
    mediaType, // e.g., "images", "videos"
    subType, // e.g., "icon", "banner", "thumbnail"
    version,
    action,
  }: ApiMediaGetParam): Promise<ApiResponse<any>> => {
    const resource = entityType.toLowerCase();
    const { data } = await apiClient.get<ApiResponse<any>>(
      `/admin/${resource}/${entityId}/${mediaType}/${subType}/${action}/${version}`,
    );
    return data;
  },
  delVersionMedia: async ({
    entityType, // e.g., "genres", "movies", "actors"
    entityId, // UUID
    mediaType, // e.g., "images", "videos"
    subType, // e.g., "icon", "banner", "thumbnail"
    version,
    action,
    ...payload
  }: ApiMediaDelParam): Promise<ApiResponse<any>> => {
    const resource = entityType.toLowerCase();
    const { data } = await apiClient.delete<ApiResponse<any>>(
      `/admin/${resource}/${entityId}/${mediaType}/${subType}/${action}/${version}`,
      {
        data: payload,
      },
    );
    return data;
  },
};
