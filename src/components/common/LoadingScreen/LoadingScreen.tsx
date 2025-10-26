import Spinner from "@/components/ui/Spinner";
import { cn } from "@/utils/helpers/classNames";
import type { LoadingScreenProps } from "./LoadingScreen.types";

const LoadingScreen = ({
  message = "Loading...",
  fullScreen = true,
  overlay = false,
  size = "lg",
}: LoadingScreenProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

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
};

export default LoadingScreen;
