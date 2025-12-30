import { lazy } from "react";
import type { LoaderFunctionArgs, RouteObject } from "react-router-dom";

const ListPage = lazy(
  () =>
    import("@/modules/authenticated/features/Users/pages/AdminUsersListPage"),
);

export const AuthenticatedUsersRoutesConfig: RouteObject[] = [
  {
    index: true,
    path: "admins",
    Component: ListPage,
    loader: async (args: LoaderFunctionArgs) => {
      const { allUserAdminLoader } =
        await import("@/modules/authenticated/features/Users/loaders/UserAdmins.loader");
      return allUserAdminLoader(args);
    },
    handle: {
      breadcrumb: { label: "All Admin Users", icon: "👤" },
    },
  },
];
