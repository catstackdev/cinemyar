import { lazy } from "react";
import type { LoaderFunctionArgs, RouteObject } from "react-router-dom";

const ListPage = lazy(
  () => import("@/modules/authenticated/features/Roles/pages/AllRolesPage"),
);
// const DetailPage = lazy(
//   () => import("@/modules/authenticated/features/Genres/pages/GenreDetailPage"),
// );
// const DeletedGenresPage = lazy(
//   () =>
//     import("@/modules/authenticated/features/Genres/pages/DeletedGenresPage"),
// );

export const AuthenticatedRolesRoutesConfig: RouteObject[] = [
  {
    index: true,
    Component: ListPage,
    loader: async (args: LoaderFunctionArgs) => {
      const { allRolesLoader } =
        await import("@/modules/authenticated/features/Roles/loaders/allRoles.loader");
      return allRolesLoader(args);
    },
    handle: {
      breadcrumb: { label: "All Roles", icon: "📄" },
    },
  },

  // {
  //   path: "deleted",
  //   Component: DeletedGenresPage,
  //   loader: async (args: LoaderFunctionArgs) => {
  //     const { allDeletedGenresLoader } =
  //       await import("@/modules/authenticated/features/Genres/loaders/allDeletedGenresLoader");
  //     return allDeletedGenresLoader(args);
  //   },
  //   handle: {
  //     breadcrumb: { label: "All Deleted Genres", icon: "📄" },
  //   },
  // },
  // {
  //   path: ":id",
  //   Component: DetailPage,
  //   loader: (args) =>
  //     import("@/modules/authenticated/features/Genres/loaders/genreDetailLoader").then(
  //       (m) => m.genresDetailLoader(args),
  //     ),
  //   handle: {
  //     breadcrumb: {
  //       label: (data: any) => data?.data?.name ?? "Genre Details",
  //       icon: "📄",
  //       // iconUrl: (data: any) => data?.data?.iconUrl ?? null,
  //     },
  //   },
  // },
];
