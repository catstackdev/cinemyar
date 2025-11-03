import React from "react";
import { useAppSelector } from "@/store/hooks";
import { LoadingScreen } from "@/components/common/LoadingScreen";

interface AppAuthGuardProps {
  children: React.ReactNode;
}

export const AppAuthGuard: React.FC<AppAuthGuardProps> = ({ children }) => {
  const { isLoading, accessToken } = useAppSelector((state) => state.auth);

  // Show loading screen if we're validating a token on initial load
  if (isLoading && accessToken) {
    return <LoadingScreen message="Validating session..." />;
  }

  // Render the app normally
  return <>{children}</>;
};

export default AppAuthGuard;