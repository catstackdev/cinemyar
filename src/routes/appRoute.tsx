import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { LoadingScreen } from "@/components/common";
import PageNotFound from "@/components/common/PageNotFound";
import PageRouteError from "@/components/common/PageRouteError";
import { AuthenticatedRoutesConfig } from "@/features/authenticated/routes";
import { AppLayout } from "@/layouts";
import { createElement, Suspense } from "react";
import { AuthRoutesConfig } from "@/features/auth/routes";

const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    Component: () => createElement(Navigate, { to: "auth", replace: true }),
  },
  {
    path: "/auth",
    errorElement: <PageRouteError />,
    HydrateFallback: LoadingScreen,
    children: AuthRoutesConfig,
  },
  {
    path: "/authenticated",
    element: <AppLayout />,
    errorElement: <PageRouteError />,
    HydrateFallback: LoadingScreen,
    children: AuthenticatedRoutesConfig,
  },
  {
    path: "*",
    Component: PageNotFound,
  },
]);

export const AppRoute = () => (
  <Suspense fallback={<LoadingScreen />}>
    <RouterProvider router={router} />
  </Suspense>
);
