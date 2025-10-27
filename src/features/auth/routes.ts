import PageNotFound from "@/components/common/PageNotFound";
import { createElement, lazy } from "react";
import { type RouteObject, Navigate } from "react-router-dom";

const LoginPage = lazy(() => import("@/features/auth/Login"));
export const AuthRoutesConfig: RouteObject[] = [
  {
    index: true,
    Component: () => createElement(Navigate, { to: "login", replace: true }),
  },
  {
    path: "login",
    Component: LoginPage,
  },

  {
    path: "*",
    Component: PageNotFound,
  },
  // {
  //   path: "cities/:id",
  //   Component: City,
  //   loader: TravelAppCityPageLoader,
  //   ErrorBoundary: ErrorPage,
  //   HydrateFallback: PageLoading,
  // },
];
