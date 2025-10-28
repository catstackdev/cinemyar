import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LoadingScreen, ProtectedRoute } from "@/components/common";
import PageNotFound from "@/components/common/PageNotFound";
import PageRouteError from "@/components/common/PageRouteError";
import { AuthenticatedRoutesConfig } from "@/features/authenticated/routes";
import { AppLayout } from "@/layouts";
import { Suspense } from "react";
import { AuthRoutesConfig } from "@/features/auth/routes";
import { RootRedirect } from "@/components/common/RootRedirect";

const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    Component: () => <RootRedirect />,
    // Component: () =>
    //   createElement(Navigate, { to: "authenticated", replace: true }),
  },
  {
    path: "/auth",
    errorElement: <PageRouteError />,
    HydrateFallback: LoadingScreen,
    children: AuthRoutesConfig,
  },
  {
    path: "/authenticated",
    // element: <AppLayout />,
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <PageRouteError />,
    HydrateFallback: LoadingScreen,
    children: AuthenticatedRoutesConfig,
  },
  // {
  //   path: "/authenticated",
  //   element: <ProtectedRoute />,
  //   children: [
  //     {
  //       index: true,
  //       element: <AppLayout />,
  //     },
  //     ...AuthenticatedRoutesConfig,
  //   ],
  // },
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
