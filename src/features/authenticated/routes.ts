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
    path: "*",
    Component: PageNotFound,
  },
];
