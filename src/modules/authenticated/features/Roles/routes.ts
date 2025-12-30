import { lazy } from "react";
import type { LoaderFunctionArgs, RouteObject } from "react-router-dom";

const ListPage = lazy(
  () => import("@/modules/authenticated/features/Roles/pages/AllRolesPage"),
);
const DetailPage = lazy(
  () => import("@/modules/authenticated/features/Roles/pages/RoleDetailPage"),
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
  {
    path: ":id",
    Component: ListPage,
    loader: async (args: LoaderFunctionArgs) => {
      const { roleDetailLoader } =
        await import("@/modules/authenticated/features/Roles/loaders/roleDetail.loader");
      return roleDetailLoader(args);
    },
    handle: {
      breadcrumb: { label: "Role Detail", icon: "📄" },
    },
  },
];
