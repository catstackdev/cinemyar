import PageNotFound from "@/components/common/PageNotFound";
import { createElement, lazy } from "react";
import { type RouteObject, Navigate } from "react-router-dom";
import { moviesLoader } from "./loaders/moviesLoader";

const MoviesListPage = lazy(
  () => import("@/features/authenticated/Movies/pages/MovieList"),
);

const EncodingListPage = lazy(
  () => import("@/features/authenticated/Movies/pages/MovieEncoding"),
);

const AnalyticsPage = lazy(
  () => import("@/features/authenticated/Movies/pages/MovieAnalytics"),
);

const MetadataPage = lazy(
  () => import("@/features/authenticated/Movies/pages/MovieMetadata"),
);

const ArchivePage = lazy(
  () => import("@/features/authenticated/Movies/pages/MovieArchive"),
);

const SettingsPage = lazy(
  () => import("@/features/authenticated/Movies/pages/MovieSettings"),
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
    path: "*",
    Component: PageNotFound,
  },
];
