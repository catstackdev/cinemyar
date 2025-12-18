import type { GenrePaginationParams } from "@/shared/types/types";
import { lazy } from "react";
import { type LoaderFunctionArgs, type RouteObject } from "react-router-dom";
import { allDeletedGenresLoader } from "./loaders/allDeletedGenresLoader";

const ListPage = lazy(
  () => import("@/modules/authenticated/features/Genres/pages/AllGenresPage"),
);
const DetailPage = lazy(
  () => import("@/modules/authenticated/features/Genres/pages/GenreDetailPage"),
);
const StageImagesPage = lazy(
  () =>
    import("@/modules/authenticated/features/Genres/pages/GenresStageImagePage"),
);
const DeletedGenresPage = lazy(
  () =>
    import("@/modules/authenticated/features/Genres/pages/DeletedGenresPage"),
);

export const AuthenticatedGenresRoutesConfig: RouteObject[] = [
  {
    index: true,
    Component: ListPage,
    loader: async (args: LoaderFunctionArgs) => {
      const { allGenresLoader } =
        await import("@/modules/authenticated/features/Genres/loaders/allGenresLoader");
      return allGenresLoader(args);
    },
    handle: {
      breadcrumb: { label: "All Genres", icon: "📄" },
    },
  },

  {
    path: "deleted",
    Component: DeletedGenresPage,
    loader: async (args: LoaderFunctionArgs) => {
      const { allDeletedGenresLoader } =
        await import("@/modules/authenticated/features/Genres/loaders/allDeletedGenresLoader");
      return allDeletedGenresLoader(args);
    },
    handle: {
      breadcrumb: { label: "All Genres", icon: "📄" },
    },
  },

  {
    path: ":id",
    Component: DetailPage,
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
