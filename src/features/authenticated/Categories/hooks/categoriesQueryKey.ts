export const categoriesQueryKey = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
}) => ["categories", params];
