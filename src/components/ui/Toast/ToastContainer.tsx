import { forwardRef, type ReactNode } from "react";
import type { ToastContainerProps } from "./Toast.types";
import { cn } from "@/utils/helpers/classNames";
import { toastPositions } from "./constants";

interface ToastContainerPropsExtended extends ToastContainerProps {
  children?: ReactNode;
}

const ToastContainer = forwardRef<HTMLDivElement, ToastContainerPropsExtended>(
  ({ position = "top-right", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "pointer-events-none fixed z-50 flex flex-col gap-2",
          toastPositions[position],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ToastContainer.displayName = "ToastContainer";

export default ToastContainer;
