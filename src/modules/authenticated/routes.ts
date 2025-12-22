import PageNotFound from "@/components/common/PageNotFound";
import { createElement, lazy } from "react";
import { type RouteObject, Navigate } from "react-router-dom";
import { AuthenticatedMoviesRoutesConfig } from "./features/Movies/routes";
import { AuthenticatedGenresRoutesConfig } from "./features/Genres/routes";
import { AuthenticatedRolesRoutesConfig } from "./features/Roles/routes";

const AuthenticatedDashboardPage = lazy(
  () => import("@/modules/authenticated/features/Dashboard"),
);

const AuthenticatedMoviesLayout = lazy(
  () => import("@/modules/authenticated/features/Movies/layouts/MovieLayout"),
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
    path: "genres",
    handle: {
      breadcrumb: { label: "Genres", icon: "🎭" },
    },
    children: AuthenticatedGenresRoutesConfig,
  },

  {
    path: "roles",
    handle: {
      breadcrumb: { label: "Roles", icon: "👤" },
    },
    children: AuthenticatedRolesRoutesConfig,
  },
  // {
  //   path: "categories",
  //   Component: CategoryPage,
  //   loader: () =>
  //     import(
  //       "@/features/authenticated/Categories/loaders/categoriesLoader"
  //     ).then((m) => m.categoriesLoader()),
  //   handle: {
  //     breadcrumb: { label: "Categories", icon: "🎬" },
  //   },
  // },
  // {
  //   path: "categories/:id",
  //   Component: CategoryDetailPage,
  //   loader: ({ params }) =>
  //     import(
  //       "@/features/authenticated/Categories/loaders/categoryDetailLoader"
  //     ).then((m) => m.categoryDetailLoader({ params: params as { id: string } })),
  //   handle: {
  //     breadcrumb: { label: "Category Detail", icon: "📄" },
  //   },
  // },
  {
    path: "*",
    Component: PageNotFound,
  },
];
