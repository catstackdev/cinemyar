export const categoriesQueryKey = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => ["categories", params];
