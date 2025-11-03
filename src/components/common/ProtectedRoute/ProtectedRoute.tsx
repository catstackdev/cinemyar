import { useAppSelector } from "@/store/hooks";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import type { ProtectedRouteProps } from "./ProtectedRoute.types";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, accessToken } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Show loading only if we're checking auth and have a token
  if (isLoading && accessToken) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  // If not authenticated and not loading, redirect to auth
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
