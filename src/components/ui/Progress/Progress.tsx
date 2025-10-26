import { forwardRef } from "react";
import type { ProgressProps } from "./Progress.types";
import { cn } from "@/utils/helpers/classNames";
import { progressVariants, progressSizes } from "./constants";

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      variant = "default",
      size = "md",
      showLabel = false,
      className,
      ...props
    },
    ref,
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <div
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn(
            "w-full overflow-hidden rounded-full bg-gray-200",
            progressSizes[size],
          )}
        >
          <div
            className={cn(
              "h-full transition-all duration-300 ease-in-out",
              progressVariants[variant],
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showLabel && (
          <div className="mt-1 text-xs text-gray-600">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    );
  },
);

Progress.displayName = "Progress";

export default Progress;
