import { lazy } from "react";
import type { LoaderFunctionArgs, RouteObject } from "react-router-dom";

const ListPage = lazy(
  () => import("@/modules/authenticated/features/Roles/pages/AllRolesPage"),
);

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
];
