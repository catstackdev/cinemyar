import { useAppSelector } from "@/store/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { LoadingScreen } from "./LoadingScreen";

export const RootRedirect: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  // No useEffect needed here - AuthInitializer handles token validation

  // Show loading while validating token
  if (isLoading) {
    return <LoadingScreen message="Validating session..." />;
  }

  // If not authenticated, redirect to auth
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // User is authenticated, redirect to app
  return <Navigate to="/authenticated" replace />;
};
