import PageNotFound from "@/components/common/PageNotFound";
import { createElement, lazy } from "react";
import { type RouteObject, Navigate } from "react-router-dom";
import { AuthenticatedMoviesRoutesConfig } from "./Movies/routes";

const AuthenticatedDashboardPage = lazy(
  () => import("@/features/authenticated/Dashboard"),
);

const AuthenticatedMoviesLayout = lazy(
  () => import("@/features/authenticated/Movies/layouts/MovieLayout"),
);

const CategoryPage = lazy(
  () => import("@/features/authenticated/Categories/pages/CategoriesPage"),
);

const CategoryDetailPage = lazy(
  () => import("@/features/authenticated/Categories/pages/CategoryDetail"),
);

export const AuthenticatedRoutesConfig: RouteObject[] = [
  {
    index: true,
    Component: () =>
      createElement(Navigate, { to: "dashboard", replace: true }),
  },
  {
    path: "dashboard",
    Component: AuthenticatedDashboardPage,
    handle: {
      breadcrumb: { label: "Dashboard", icon: "📊" },
    },
  },
  {
    path: "movies",
    Component: AuthenticatedMoviesLayout,
    handle: {
      breadcrumb: { label: "Movies", icon: "🎬" },
    },
    children: AuthenticatedMoviesRoutesConfig,
  },
  {
    path: "categories",
    Component: CategoryPage,
    loader: () =>
      import(
        "@/features/authenticated/Categories/loaders/categoriesLoader"
      ).then((m) => m.categoriesLoader()),
    handle: {
      breadcrumb: { label: "Categories", icon: "🎬" },
    },
  },
  {
    path: "categories/:id",
    Component: CategoryDetailPage,
    loader: ({ params }) =>
      import(
        "@/features/authenticated/Categories/loaders/categoryDetailLoader"
      ).then((m) => m.categoryDetailLoader({ params: params as { id: string } })),
    handle: {
      breadcrumb: { label: "Category Detail", icon: "📄" },
    },
  },
  {
    path: "*",
    Component: PageNotFound,
  },
];
