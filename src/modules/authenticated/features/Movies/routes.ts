import PageNotFound from "@/components/common/PageNotFound";
import { createElement, lazy } from "react";
import { type RouteObject, Navigate } from "react-router-dom";
import { moviesLoader } from "./loaders/moviesLoader";

const MoviesListPage = lazy(
  () => import("@/modules/authenticated/features/Movies/pages/MovieList"),
);

const EncodingListPage = lazy(
  () => import("@/modules/authenticated/features/Movies/pages/MovieEncoding"),
);

const AnalyticsPage = lazy(
  () => import("@/modules/authenticated/features/Movies/pages/MovieAnalytics"),
);

const MetadataPage = lazy(
  () => import("@/modules/authenticated/features/Movies/pages/MovieMetadata"),
);

const ArchivePage = lazy(
  () => import("@/modules/authenticated/features/Movies/pages/MovieArchive"),
);

const SettingsPage = lazy(
  () => import("@/modules/authenticated/features/Movies/pages/MovieSettings"),
);

const MovieDetailPage = lazy(
  () => import("@/modules/authenticated/features/Movies/pages/MovieDetail"),
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
    handle: {
      breadcrumb: { label: "List" },
    },
  },
  {
    path: "encoding",
    Component: EncodingListPage,
    handle: {
      breadcrumb: { label: "Encoding" },
    },
  },
  {
    path: "analytics",
    Component: AnalyticsPage,
    handle: {
      breadcrumb: { label: "Analytics" },
    },
  },
  {
    path: "metadata",
    Component: MetadataPage,
    handle: {
      breadcrumb: { label: "Metadata" },
    },
  },
  {
    path: "archive",
    Component: ArchivePage,
    handle: {
      breadcrumb: { label: "Archive" },
    },
  },
  {
    path: "settings",
    Component: SettingsPage,
    handle: {
      breadcrumb: { label: "Settings" },
    },
  },
  {
    path: ":id",
    Component: MovieDetailPage,
    handle: {
      breadcrumb: { label: "Movie Detail" },
    },
  },
  {
    path: "*",
    Component: PageNotFound,
  },
];
