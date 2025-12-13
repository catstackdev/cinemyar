import { useAppSelector } from "@/store/hooks";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import RoleGuard from "@/components/common/RoleGuard";
import type { ProtectedRouteProps } from "./ProtectedRoute.types";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = "/auth",
  fallback,
  allowedRoles 
}) => {
  const { isAuthenticated, isLoading, accessTokenExpiresAt } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Show loading only if we're checking auth and have a token
  if (isLoading && accessTokenExpiresAt) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  // If not authenticated and not loading, redirect to auth
  if (!isAuthenticated && !isLoading) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If authenticated but roles are required, check roles
  if (isAuthenticated && allowedRoles) {
    return (
      <RoleGuard
        allowedRoles={allowedRoles}
        fallback={fallback}
        redirectTo="/"
      >
        {children}
      </RoleGuard>
    );
  }

  // If authenticated and no role restrictions, render the protected content
  return children;
};

export default ProtectedRoute;
