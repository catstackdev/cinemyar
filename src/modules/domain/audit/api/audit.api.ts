import { apiClient } from "@/lib/axios";
import type { ApiResponse, GenrePaginationParams } from "@/shared/types";
import type { GenreAuditResponseData } from "@/shared/types/audit/genre-audit.types";

export const AdminAuditApi = {
  async getGenreAudits(
    params?: GenrePaginationParams,
  ): Promise<ApiResponse<GenreAuditResponseData>> {
    const { data } = await apiClient.get<ApiResponse<GenreAuditResponseData>>(
      `/admin/audit/genres`,
      { params },
    );
    return data;
  },
};
