import { apiClient } from "@/lib/axios";
import type { ApiResponse, PermissionResponseData } from "@/shared/types/types";

// Centralized API handlers
export const AdminPermissionAPI = {
  getPermissions: async (): Promise<ApiResponse<PermissionResponseData>> => {
    const { data } =
      await apiClient.get<ApiResponse<PermissionResponseData>>(
        "admin/permissions",
      );
    return data;
  },
};
