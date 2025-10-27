import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

import PageRouteError from "@/components/common/PageRouteError";
import { AppLayout } from "@/layouts";
import { LoadingScreen } from "@/components/common";

const DashboardPage = lazy(() => import("@/features/authenticated/Dashboard"));

const MoviesPage = lazy(() => import("@/features/authenticated/Movies"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <PageRouteError />,
    HydrateFallback: LoadingScreen,
    redirectTo: "/dashboard",
    children: [
      {
        index: true,
        path: "/dashboard",
        element: <DashboardPage />,
        HydrateFallback: LoadingScreen,
      },

      {
        path: "/movies",
        element: <MoviesPage />,
        HydrateFallback: LoadingScreen,
      },
    ],
  },
]);

export const AppRoute2 = () => (
  <Suspense fallback={<LoadingScreen />}>
    <RouterProvider router={router} />
  </Suspense>
);
