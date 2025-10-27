import PageNotFound from "@/components/common/PageNotFound";
import { createElement, lazy } from "react";
import { type RouteObject, Navigate } from "react-router-dom";
import { AuthenticatedMoviesRoutesConfig } from "./Movies/routes";

const AuthenticatedDashboardPage = lazy(
  () => import("@/features/authenticated/Dashboard"),
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
  },
  {
    path: "movies",
    children: AuthenticatedMoviesRoutesConfig,
  },
  {
    path: "*",
    Component: PageNotFound,
  },
];
