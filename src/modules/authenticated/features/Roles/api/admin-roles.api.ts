import { apiClient } from "@/lib/axios";
import type {
  AdminRole,
  AdminRoleDetail,
  AdminRoleOptionsResponse,
  AdminRolesPaginatedResponse,
  AllAdminRoleParams,
  ApiResponse,
} from "@/shared/types";
import type { AdminCreateRoleFormData } from "../schemas/roles.schemas";

// Centralized API handlers
export const AdminRolesAPI = {
  getRoles: async (
    params?: AllAdminRoleParams,
  ): Promise<AdminRolesPaginatedResponse> => {
    const { data } = await apiClient.get<AdminRolesPaginatedResponse>(
      `admin/roles`,
      { params },
    );
    return data;
  },
  getRolesOptions: async (): Promise<ApiResponse<AdminRoleOptionsResponse>> => {
    const { data } =
      await apiClient.get<ApiResponse<AdminRoleOptionsResponse>>(
        `admin/roles/options`,
      );
    return data;
  },
  getRole: async (id: string): Promise<ApiResponse<AdminRoleDetail>> => {
    const { data } = await apiClient.get<ApiResponse<AdminRoleDetail>>(
      `admin/roles/${id}`,
    );
    return data;
  },
  addRole: async (
    data: AdminCreateRoleFormData,
  ): Promise<ApiResponse<AdminRole>> => {
    const { data: res } = await apiClient.post<ApiResponse<AdminRole>>(
      "/admin/roles",
      data,
    );
    return res;
  },
  updateRole: async (
    id: string,
    data: Partial<AdminCreateRoleFormData>,
  ): Promise<ApiResponse<AdminRole>> => {
    const { data: res } = await apiClient.put<ApiResponse<AdminRole>>(
      `/admin/roles/${id}`,
      data,
    );
    return res;
  },

  DeleteRole: async (id: string): Promise<ApiResponse<any>> => {
    const { data } = await apiClient.delete<ApiResponse<any>>(
      `/admin/roles/${id}`,
    );
    return data;
  },
  // permanentDeleteAllGenre: async (
  //   reason?: string,
  // ): Promise<ApiResponse<any>> => {
  //   const { data } = await apiClient.delete<ApiResponse<any>>(
  //     `/admin/genres/deleted/all/permanent`,
  //     {
  //       data: reason ? { reason } : {},
  //     },
  //   );
  //   return data;
  // },
};
