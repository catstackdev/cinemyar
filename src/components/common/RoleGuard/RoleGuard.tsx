import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { hasRole } from "@/utils/permissions";
import Alert from "@/components/ui/Alert";
import type { RoleGuardProps } from "./RoleGuard.types";

export default function RoleGuard({
  allowedRoles,
  children,
  fallback,
  redirectTo = "/"
}: RoleGuardProps) {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // If user doesn't have required role, show fallback or redirect
  if (!hasRole(user, allowedRoles)) {
    if (fallback) {
      return <>{fallback}</>;
    }

    if (redirectTo) {
      return <Navigate to={redirectTo} replace />;
    }

    // Default fallback - access denied message
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <Alert variant="danger">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Access Denied
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  You don't have permission to access this page. Contact your administrator if you believe this is an error.
                </p>
              </div>
              <div className="text-xs text-gray-500">
                <p>Required roles: {allowedRoles.join(", ")}</p>
                {user?.role && <p>Your role: {user.role}</p>}
              </div>
            </div>
          </Alert>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}