import PageNotFound from "@/components/common/PageNotFound";
import { createElement, lazy } from "react";
import { type RouteObject, Navigate } from "react-router-dom";
import { moviesLoader } from "./loaders/moviesLoader";

const MoviesListPage = lazy(
  () => import("@/features/authenticated/Movies/pages/MovieList"),
);

export const AuthenticatedMoviesRoutesConfig: RouteObject[] = [
  {
    index: true,
    Component: () => createElement(Navigate, { to: "list", replace: true }),
  },
  {
    path: "list",
    Component: MoviesListPage,
    loader: moviesLoader,
  },
  {
    path: "*",
    Component: PageNotFound,
  },
];
