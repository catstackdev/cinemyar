import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  LoadingScreen,
  ProtectedRoute,
  AppAuthGuard,
} from "@/components/common";
import PageNotFound from "@/components/common/PageNotFound";
import PageRouteError from "@/components/common/PageRouteError";
import { AuthenticatedRoutesConfig } from "@/modules/authenticated/routes";
import { PublicRoutesConfig } from "@/modules/publicc/features/authenticated/Genres/pages/routes";
import { AppLayout, PublicLayout } from "@/modules/authenticated/layouts";
import { Suspense } from "react";
import { AuthRoutesConfig } from "@/modules/auth/routes";
import { UserRole } from "@/shared/enums";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <PageRouteError />,
    HydrateFallback: LoadingScreen,
    children: PublicRoutesConfig,
  },
  {
    path: "/auth",
    errorElement: <PageRouteError />,
    HydrateFallback: LoadingScreen,
    children: AuthRoutesConfig,
  },
  {
    path: "/authenticated",
    element: (
      <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <PageRouteError />,
    HydrateFallback: LoadingScreen,
    handle: {
      breadcrumb: { label: "Home", icon: "🏠" },
    },
    children: AuthenticatedRoutesConfig,
  },
  {
    path: "*",
    Component: PageNotFound,
  },
]);

export const AppRoute = () => (
  <Suspense fallback={<LoadingScreen />}>
    <AppAuthGuard>
      <RouterProvider router={router} />
    </AppAuthGuard>
  </Suspense>
);
