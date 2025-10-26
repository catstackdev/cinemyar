import { forwardRef, useEffect } from "react";
import type { ToastProps } from "./Toast.types";
import { cn } from "@/utils/helpers/classNames";
import { toastVariants, toastIconColors } from "./constants";

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = "info",
      title,
      message,
      icon,
      duration,
      onClose,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    useEffect(() => {
      if (duration && onClose) {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
      }
      return undefined;
    }, [duration, onClose]);

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "pointer-events-auto relative flex w-full max-w-sm rounded-lg border p-4 shadow-lg",
          "animate-in slide-in-from-top-5 fade-in",
          toastVariants[variant],
          className,
        )}
        {...props}
      >
        <div className="flex gap-3">
          {icon && (
            <div className={cn("shrink-0", toastIconColors[variant])}>
              {icon}
            </div>
          )}
          <div className="flex-1">
            {title && (
              <h5 className="mb-1 font-semibold leading-none">{title}</h5>
            )}
            {message && <div className="text-sm">{message}</div>}
            {children}
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded p-1 hover:bg-black/10 transition-colors"
              aria-label="Close toast"
            >
              <svg
                className="h-4 w-4"
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
      </div>
    );
  },
);

Toast.displayName = "Toast";

export default Toast;
