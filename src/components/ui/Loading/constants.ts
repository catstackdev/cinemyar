import type { Size } from "@/types/size";
import type { LoadingSkeletonVariant, LoadingSpeed } from "./Loading.types";

export const LoadingColorClasses = {
  primary: "text-primary",
  secondary: "text-secondary-foreground",
  danger: "text-danger",
  success: "text-success",
  info: "text-info",
  warning: "text-warning",
};

export const LoadingSizeClasses: Record<Size, string> = {
  xs: "w-2 h-2",
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
};

export const LoadingBorderSizes: Record<Size, string> = {
  xs: "border",
  sm: "border-2",
  md: "border-2",
  lg: "border-[3px]",
  xl: "border-4",
};

export const LoadingSkeletonHeights: Record<Size, string> = {
  xs: "h-3",
  sm: "h-4",
  md: "h-5",
  lg: "h-6",
  xl: "h-8",
};

export const LoadingBarsHeights: Record<Size, string[]> = {
  xs: ["h-1", "h-1.5", "h-2", "h-2.5"],
  sm: ["h-1.5", "h-2", "h-2.5", "h-3"],
  md: ["h-2", "h-3", "h-4", "h-5"],
  lg: ["h-3", "h-4", "h-5", "h-6"],
  xl: ["h-4", "h-5", "h-6", "h-8"],
};

export const LoadingSkeletonVariants: Record<LoadingSkeletonVariant, string> = {
  default: "bg-muted",
  muted: "bg-muted opacity-60",
  subtle: "bg-muted opacity-40",
};

export const LoadingSpeedClasses: Record<LoadingSpeed, string> = {
  slow: "duration-1000",
  normal: "duration-700",
  fast: "duration-500",
};

export const LoadingSpinSpeedClasses: Record<LoadingSpeed, string> = {
  slow: "[animation-duration:1.5s]",
  normal: "[animation-duration:1s]",
  fast: "[animation-duration:0.6s]",
};
