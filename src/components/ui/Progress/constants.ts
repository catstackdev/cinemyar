import type { ProgressVariant, ProgressSize } from "./Progress.types";

export const progressVariants: Record<ProgressVariant, string> = {
  default: "bg-blue-500",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
};

export const progressSizes: Record<ProgressSize, string> = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};
