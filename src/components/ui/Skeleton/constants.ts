import type { SkeletonVariant } from "./Skeleton.types";

export const variantClasses: Record<SkeletonVariant, string> = {
  text: "h-4 w-full rounded",
  circular: "rounded-full",
  rectangular: "rounded",
};
