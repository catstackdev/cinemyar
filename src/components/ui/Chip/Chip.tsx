import { forwardRef } from "react";
import type { ChipProps } from "./Chip.types";
import { cn } from "@/utils/helpers/classNames";
import { chipVariants, chipSizes } from "./constants";

const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      variant = "default",
      size = "md",
      onRemove,
      icon,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full font-medium transition-colors",
          chipVariants[variant],
          chipSizes[size],
          className,
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="shrink-0 rounded-full hover:bg-black/10 transition-colors"
            aria-label="Remove"
          >
            <svg
              className={cn(
                "h-3 w-3",
                size === "sm" && "h-2.5 w-2.5",
                size === "lg" && "h-4 w-4",
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  },
);

Chip.displayName = "Chip";

export default Chip;
