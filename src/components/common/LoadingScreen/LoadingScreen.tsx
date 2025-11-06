import { cn } from "@/utils/helpers/classNames";
import type { LoadingScreenProps } from "./LoadingScreen.types";
import { Spinner, MessageBox } from "@/components/ui";
import { Loader2 } from "lucide-react";

const LoadingScreen = ({
  message = "Loading...",
  fullScreen = true,
  overlay = false,
  size = "lg",
  withPortal = false,
  portalVariant = "cosmic",
  animated = true,
}: LoadingScreenProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const iconSizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  // Legacy mode (no portal, no MessageBox)
  if (!withPortal && overlay) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-4",
          fullScreen && "min-h-screen",
          overlay && "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
          !fullScreen && !overlay && "p-8",
        )}
      >
        <Spinner className={sizeClasses[size]} />
        {message && (
          <p className="text-muted-foreground animate-pulse">{message}</p>
        )}
      </div>
    );
  }

  // Modern mode with MessageBox and Portal
  return (
    <MessageBox
      animated={animated}
      open={true}
      withPortal={withPortal}
      portalVariant={portalVariant}
      portalIntensity="high"
      portalSize="xl"
      portalPosition="center"
      portalAnimated={true}
      variant="info"
      fullScreen={fullScreen}
      className="text-center"
    >
      {/* Animated Loading Icon */}
      <div className="mb-6">
        <div
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-info-50 mb-4",
            iconSizeClasses[size],
          )}
        >
          <Loader2 className={cn("text-info animate-spin", sizeClasses[size])} />
        </div>

        {/* Loading Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Loading...
        </h2>

        {/* Loading Message */}
        {message && (
          <p className="text-muted-foreground text-sm md:text-base animate-pulse">
            {message}
          </p>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="mt-6">
        <div className="flex justify-center gap-2">
          <div
            className="w-2 h-2 bg-info rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="w-2 h-2 bg-info rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-2 h-2 bg-info rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>

      {/* Hint Text */}
      <p className="mt-8 text-xs text-muted-foreground/70">
        Please wait while we prepare everything for you...
      </p>
    </MessageBox>
  );
};

export default LoadingScreen;
