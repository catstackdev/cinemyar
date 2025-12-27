import React from "react";
import type { LoadingOverlayProps } from "./LoadingOverlay.types";
import Loading from "../Loading/Loading";
import { cn } from "@/utils/helpers/classNames";

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  loadingProps,
  children,
  className,
  isLoading,
  ...rest
}) => {
  if (!isLoading) return <>{children}</>;

  return (
    <div className={cn("relative", className)} {...rest}>
      {children}
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/20 backdrop-blur">
        <Loading {...loadingProps} />
      </div>
    </div>
  );
};

export default LoadingOverlay;
