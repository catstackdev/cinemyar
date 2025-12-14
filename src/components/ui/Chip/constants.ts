import type { ChipVariant, ChipSize } from "./Chip.types";

export const chipVariants: Record<ChipVariant, string> = {
  default: "bg-foreground text-background hover:bg-foreground/80",
  primary: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  success: "bg-green-100 text-green-700 hover:bg-green-200",
  warning: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
  danger: "bg-red-100 text-red-700 hover:bg-red-200",
};

export const chipSizes: Record<ChipSize, string> = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-2.5 py-1 text-sm gap-1.5",
  lg: "px-3 py-1.5 text-base gap-2",
};
