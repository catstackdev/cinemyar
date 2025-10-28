import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/state/auth";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import type { ProtectedRouteProps } from "./ProtectedRoute.types";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthenticated]);

  if (isLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    // return <Navigate to="auth/login" state={{ from: location }} replace />;
    return <Navigate to="/auth" replace />;
  }
  return children;

  // return <Outlet />;
};

export default ProtectedRoute;
