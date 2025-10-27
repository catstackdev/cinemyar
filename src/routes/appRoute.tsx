import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { createElement, lazy, Suspense } from "react";

import PageRouteError from "@/components/common/PageRouteError";
import { AppLayout } from "@/layouts";
import { LoadingScreen } from "@/components/common";
import { MoviesRoutesConfig } from "@/features/authenticated/Movies/routes/routeConfig";
import PageNotFound from "@/components/common/PageNotFound";

const DashboardPage = lazy(() => import("@/features/authenticated/Dashboard"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <PageRouteError />,
    HydrateFallback: LoadingScreen,
    Component: () =>
      createElement(Navigate, { to: "dashboard", replace: true }),
    children: [
      {
        index: true,
        path: "/dashboard",
        element: <DashboardPage />,
        HydrateFallback: LoadingScreen,
      },

      {
        path: "/movies",
        // element: <MoviesPage />,
        HydrateFallback: LoadingScreen,
        children: MoviesRoutesConfig,
      },
      {
        path: "*",
        Component: PageNotFound,
      },
    ],
  },
]);

export const AppRoute = () => (
  <Suspense fallback={<LoadingScreen />}>
    <RouterProvider router={router} />
  </Suspense>
);
