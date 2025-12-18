import type { GenreOptionParams } from "@/shared/types/types";

export const PublicGenresOptionsQueryKey = (params?: GenreOptionParams) => [
  "public",
  "genres",
  "options",
  params,
];
