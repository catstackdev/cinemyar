import React from "react";
import type { LoadingProps } from "./Loading.types";
import {
  LoadingBorderSizes,
  LoadingSizeClasses,
  LoadingSkeletonHeights,
  LoadingColorClasses,
  LoadingBarsHeights,
  LoadingSkeletonVariants,
  LoadingSpeedClasses,
  LoadingSpinSpeedClasses,
} from "./constants";
import { cn } from "@/utils/helpers/classNames";

const Loading: React.FC<LoadingProps> = ({
  type = "spinner",
  size = "md",
  color = "primary",
  text,
  fullscreen = false,
  inline = false,
  inheritColor = false,
  count = 1,
  children,
  className,
  containerClassName,
  speed = "normal",
  skeletonVariant = "default",
  textWidths,
  zIndex = 50,
  label,
}) => {
  const height = LoadingSizeClasses[size]
    .split(" ")
    .find((c) => c.startsWith("h-"));

  const colorClass = inheritColor ? "" : LoadingColorClasses[color];
  const speedClass = LoadingSpeedClasses[speed];
  const spinSpeedClass = LoadingSpinSpeedClasses[speed];
  const skeletonColorClass = LoadingSkeletonVariants[skeletonVariant];

  const defaultTextWidths = ["100%", "100%", "70%"];
  const widths =
    textWidths && textWidths.length > 0 ? textWidths : defaultTextWidths;

  const ariaLabel =
    label || (type === "spinner" ? "Loading" : `Loading ${type}`);

  const renderLoading = () => {
    switch (type) {
      case "spinner":
        return (
          <span
            className={cn(
              LoadingSizeClasses[size],
              LoadingBorderSizes[size],
              "border-current border-t-transparent rounded-full animate-spin",
              spinSpeedClass,
              colorClass,
              className,
            )}
            role="status"
            aria-label={ariaLabel}
            aria-live="polite"
            aria-busy="true"
          />
        );

      case "dots":
        return (
          <span
            className={cn("inline-flex gap-1", colorClass, className)}
            role="status"
            aria-label={ariaLabel}
            aria-live="polite"
            aria-busy="true"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  LoadingSizeClasses[size],
                  "rounded-full bg-current animate-pulse",
                  speedClass,
                )}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </span>
        );

      case "pulse":
        return (
          <span
            className={cn(
              LoadingSizeClasses[size],
              "rounded-full bg-current animate-pulse",
              speedClass,
              colorClass,
              className,
            )}
            role="status"
            aria-label={ariaLabel}
            aria-live="polite"
            aria-busy="true"
          />
        );

      case "bars":
        return (
          <span
            className={cn(
              "inline-flex gap-1 items-end",
              height,
              colorClass,
              className,
            )}
            role="status"
            aria-label={ariaLabel}
            aria-live="polite"
            aria-busy="true"
          >
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={cn(
                  "w-1 bg-current animate-pulse",
                  speedClass,
                  LoadingBarsHeights[size][i],
                )}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </span>
        );

      case "skeleton-text":
        return (
          <div
            className={cn("space-y-2", inline ? "" : "w-full", className)}
            role="status"
            aria-label={ariaLabel}
            aria-live="polite"
            aria-busy="true"
          >
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  LoadingSkeletonHeights[size] || "h-4",
                  skeletonColorClass,
                  "rounded animate-pulse",
                  speedClass,
                )}
                style={{ width: widths[i % widths.length] }}
              />
            ))}
          </div>
        );

      case "skeleton-circular":
        return (
          <div
            className={cn("flex gap-2", className)}
            role="status"
            aria-label={ariaLabel}
            aria-live="polite"
            aria-busy="true"
          >
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  LoadingSizeClasses[size],
                  skeletonColorClass,
                  "rounded-full animate-pulse",
                  speedClass,
                )}
              />
            ))}
          </div>
        );

      case "skeleton-rect":
        return (
          <div
            className={cn("space-y-2", inline ? "" : "w-full", className)}
            role="status"
            aria-label={ariaLabel}
            aria-live="polite"
            aria-busy="true"
          >
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-24 rounded animate-pulse",
                  skeletonColorClass,
                  speedClass,
                )}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (inline) {
    return renderLoading();
  }

  const content = (
    <>
      {renderLoading()}
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
      {children}
    </>
  );

  if (fullscreen) {
    return (
      <div
        className={cn(
          "fixed inset-0 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm",
          containerClassName,
        )}
        style={{ zIndex }}
        role="alert"
        aria-live="assertive"
        aria-busy="true"
      >
        {content}
      </div>
    );
  }

  const isSkeleton = type.startsWith("skeleton");

  return (
    <div
      className={cn(
        "flex flex-col gap-3 p-4",
        isSkeleton ? "items-start" : "items-center justify-center",
        containerClassName,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {content}
    </div>
  );
};

export default Loading;
