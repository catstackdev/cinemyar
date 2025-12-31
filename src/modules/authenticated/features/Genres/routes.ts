import { lazy } from "react";
import type { LoaderFunctionArgs, RouteObject } from "react-router-dom";

const ListPage = lazy(
  () => import("@/modules/authenticated/features/Genres/pages/AllGenresPage"),
);
const DetailPage = lazy(
  () => import("@/modules/authenticated/features/Genres/pages/GenreDetailPage"),
);
const DeletedGenresPage = lazy(
  () =>
    import("@/modules/authenticated/features/Genres/pages/DeletedGenresPage"),
);
const AuditPage = lazy(
  () => import("@/modules/authenticated/features/Genres/pages/GenresAuditPage"),
);

export const AuthenticatedGenresRoutesConfig: RouteObject[] = [
  // {
  //   index: true,
  //   Component: () => createElement(Navigate, { to: "list", replace: true }),
  //   handle: {
  //     breadcrumb: { label: "All Genres", icon: "📄" },
  //   },
  // },
  {
    index: true,
    // path: "list",
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
      breadcrumb: { label: "All Deleted Genres", icon: "📄" },
    },
  },

  {
    path: "audit",
    Component: AuditPage,
    loader: async (args: LoaderFunctionArgs) => {
      const { genreAuditLoader } =
        await import("@/modules/authenticated/features/Genres/loaders/genreAuditLoader");
      return genreAuditLoader(args);
    },
    handle: {
      breadcrumb: { label: "Genres Audit Log", icon: "📄" },
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
      breadcrumb: {
        label: (data: any) => data?.data?.name ?? "Genre Details",
        icon: "📄",
        // iconUrl: (data: any) => data?.data?.iconUrl ?? null,
      },
    },
  },
];
