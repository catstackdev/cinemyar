import PageNotFound from "@/components/common/PageNotFound";
import { createElement, lazy } from "react";
import { type RouteObject, Navigate } from "react-router-dom";

const MoviesPage = lazy(() => import("@/features/authenticated/Movies"));
export const MoviesRoutesConfig: RouteObject[] = [
  {
    index: true,
    Component: () => createElement(Navigate, { to: "list", replace: true }),
  },
  {
    path: "list",
    Component: MoviesPage,
  },
  // {
  //   path: "cities/:id",
  //   Component: City,
  //   loader: TravelAppCityPageLoader,
  //   ErrorBoundary: ErrorPage,
  //   HydrateFallback: PageLoading,
  // },
  {
    path: "*",
    Component: PageNotFound,
  },
];
