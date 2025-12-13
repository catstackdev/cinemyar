import React from "react";
import { useAppSelector } from "@/store/hooks";
import { LoadingScreen } from "@/components/common/LoadingScreen";

interface AppAuthGuardProps {
  children: React.ReactNode;
}

export const AppAuthGuard: React.FC<AppAuthGuardProps> = ({ children }) => {
  const { isLoading, accessTokenExpiresAt } = useAppSelector((state) => state.auth);

  // Show loading screen if we're validating a token on initial load
  if (isLoading && accessTokenExpiresAt) {
    return <LoadingScreen message="Validating session..." />;
  }

  // Render the app normally
  return <>{children}</>;
};

export default AppAuthGuard;