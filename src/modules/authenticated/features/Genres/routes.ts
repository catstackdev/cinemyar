import type { GenrePaginationParams } from "@/shared/types/types";
import { createElement, lazy } from "react";
import {
  Navigate,
  type LoaderFunctionArgs,
  type RouteObject,
} from "react-router-dom";
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
  // {
  //   index: true,
  //   Component: () =>
  //     createElement(Navigate, { to: "list", replace: true }),
  // },
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
    loader: (args) =>
      import("@/modules/authenticated/features/Genres/loaders/genreDetailLoader").then(
        (m) => m.genresDetailLoader(args),
      ),
    handle: {
      breadcrumb: { label: "Genre Details", icon: "📄" },
    },
  },
  ,
];
