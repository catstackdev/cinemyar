import { Time } from "@/shared/constants";
import { useQuery } from "@tanstack/react-query";
import { AdminAuditQueryKey } from "../api/audit-key.const";
import type { GenrePaginationParams } from "@/shared/types";
import { AdminAuditApi } from "../api";

export const useGenreAudits = (params?: GenrePaginationParams) => {
  return useQuery({
    queryKey: AdminAuditQueryKey("genres", params),
    queryFn: () => AdminAuditApi.getGenreAudits(params),
    staleTime: 5 * Time.MINUTE,
    // Keep previous data while fetching new pages for a smoother UI
    placeholderData: (previousData) => previousData,
  });
};
