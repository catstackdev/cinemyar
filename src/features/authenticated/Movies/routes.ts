import PageNotFound from "@/components/common/PageNotFound";
import { createElement, lazy } from "react";
import { type RouteObject, Navigate } from "react-router-dom";

const MoviesListPage = lazy(() => import("@/features/authenticated/Movies"));
export const AuthenticatedMoviesRoutesConfig: RouteObject[] = [
  {
    index: true,
    Component: () => createElement(Navigate, { to: "list", replace: true }),
  },
  {
    path: "list",
    Component: MoviesListPage,
  },
  {
    path: "*",
    Component: PageNotFound,
  },
];
