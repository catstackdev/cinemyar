import type { SkeletonProps } from "./Skeleton.types";
import { cn } from "@/utils/helpers/classNames";
import { variantClasses } from "./constants";

const Skeleton = ({
  variant = "rectangular",
  width,
  height,
  className,
  style,
  ...rest
}: SkeletonProps) => {
  const customStyle = {
    ...style,
    ...(width && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height && { height: typeof height === "number" ? `${height}px` : height }),
  };

  return (
    <div
      role="status"
      aria-label="Loading..."
      className={cn(
        "animate-pulse bg-gray-200 dark:bg-gray-700",
        variantClasses[variant],
        className
      )}
      style={customStyle}
      {...rest}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeleton;
