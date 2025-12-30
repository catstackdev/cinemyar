import { apiClient } from "@/lib/axios";
import type { ApiResponse } from "@/shared/types";
import type {
  AdminUserListParams,
  AdminUserListResponse,
} from "@/shared/types/user";

export const AdminUserAdminsApi = {
  getUserAdmins: async (
    params?: AdminUserListParams,
  ): Promise<ApiResponse<AdminUserListResponse>> => {
    const { data } = await apiClient.get<ApiResponse<AdminUserListResponse>>(
      `admin/admins`,
      { params },
    );
    return data;
  },
};
