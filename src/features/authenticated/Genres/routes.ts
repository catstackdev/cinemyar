import type { GenrePaginationParams } from "@/shared/types/types";
import { lazy } from "react";
import { type LoaderFunctionArgs, type RouteObject } from "react-router-dom";

const ListPage = lazy(
  () => import("@/features/authenticated/Genres/pages/AllGenresPage"),
);
const DetailPage = lazy(
  () => import("@/features/authenticated/Genres/pages/GenreDetailPage"),
);
const StageImagesPage = lazy(
  () => import("@/features/authenticated/Genres/pages/GenresStageImagePage"),
);

export const AuthenticatedGenresRoutesConfig: RouteObject[] = [
  {
    index: true,
    Component: ListPage,
    loader: async (args: LoaderFunctionArgs) => {
      const { allGenresLoader } =
        await import("@/features/authenticated/Genres/loaders/allGenresLoader");
      return allGenresLoader(args);
    },
    handle: {
      breadcrumb: { label: "All Genres", icon: "📄" },
    },
  },
  // {
  //   path: ":id",
  //   Component: DetailPage,
  //   loader: ({ params }) =>
  //     import("@/features/authenticated/Categories/loaders/categoryDetailLoader").then(
  //       (m) => m.categoryDetailLoader({ params: params as { id: string } }),
  //     ),
  //   handle: {
  //     breadcrumb: { label: "Category Detail", icon: "📄" },
  //   },
  // },
  // {
  //   path: "*",
  //   Component: PageNotFound,
  // },
];
