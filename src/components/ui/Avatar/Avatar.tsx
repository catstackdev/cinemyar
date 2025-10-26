import { useState } from "react";
import type { AvatarProps } from "./Avatar.types";
import { cn } from "@/utils/helpers/classNames";
import { sizeClasses } from "./constants";

const Avatar = ({
  src,
  alt = "",
  size = "md",
  fallback,
  className,
  ...rest
}: AvatarProps) => {
  const [hasError, setHasError] = useState(false);
  
  const initials = fallback || alt.slice(0, 2).toUpperCase();
  const showFallback = !src || hasError;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full overflow-hidden",
        "bg-gray-200 dark:bg-gray-700",
        sizeClasses[size],
        className
      )}
      {...rest}
    >
      {showFallback ? (
        <span className="text-gray-600 dark:text-gray-300 font-medium select-none">
          {initials}
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default Avatar;
