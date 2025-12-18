import { lazy } from "react";
import { type RouteObject } from "react-router-dom";

const CategoriesListPage = lazy(
  () =>
    import("@/modules/authenticated/features/Categories/pages/CategoriesPage"),
);
const CategoryDetailPage = lazy(
  () =>
    import("@/modules/authenticated/features/Categories/pages/CategoryDetail"),
);

export const AuthenticatedCategoriesRoutesConfig: RouteObject[] = [
  // {
  //   index: true,
  //   Component: () => createElement(Navigate, { to: "/", replace: true }),
  // },
  {
    index: true,
    Component: CategoriesListPage,
    loader: () =>
      import("@/modules/authenticated/features/Categories/loaders/categoriesLoader").then(
        (m) => m.categoriesLoader(),
      ),
    handle: {
      breadcrumb: { label: "list", icon: "🎬" },
    },
  },
  {
    path: ":id",
    Component: CategoryDetailPage,
    loader: ({ params }) =>
      import("@/modules/authenticated/features/Categories/loaders/categoryDetailLoader").then(
        (m) => m.categoryDetailLoader({ params: params as { id: string } }),
      ),
    handle: {
      breadcrumb: { label: "Category Detail", icon: "📄" },
    },
  },
  // {
  //   path: "*",
  //   Component: PageNotFound,
  // },
];
