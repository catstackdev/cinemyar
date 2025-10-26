import { forwardRef } from "react";
import type { SpinnerProps } from "./Spinner.types";
import { cn } from "@/utils/helpers/classNames";
import { spinnerSizes, spinnerVariants } from "./constants";

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "md", variant = "primary", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(
          "inline-block animate-spin rounded-full",
          spinnerSizes[size],
          spinnerVariants[variant],
          className,
        )}
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  },
);

Spinner.displayName = "Spinner";

export default Spinner;
