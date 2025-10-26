import { forwardRef } from "react";
import type { EmptyStateProps } from "./EmptyState.types";
import { cn } from "@/utils/helpers/classNames";

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center p-8 text-center",
          className,
        )}
        {...props}
      >
        {icon && (
          <div className="mb-4 text-gray-400">
            {icon}
          </div>
        )}
        <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="mb-6 max-w-sm text-sm text-gray-500">{description}</p>
        )}
        {action && <div>{action}</div>}
      </div>
    );
  },
);

EmptyState.displayName = "EmptyState";

export default EmptyState;
