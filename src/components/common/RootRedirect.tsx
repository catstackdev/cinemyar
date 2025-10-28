import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/state/auth";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LoadingScreen } from "./LoadingScreen";

export const RootRedirect: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
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
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Navigate to="/authenticated" replace />;
};
