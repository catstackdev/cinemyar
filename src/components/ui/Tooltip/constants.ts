import type { TooltipVariant } from "./Tooltip.types";

export const TooltipVariantClasses: Record<TooltipVariant, string> = {
  default: "bg-popover text-popover-foreground border border-border",
  dark: "bg-foreground text-background",
  light: "bg-background text-foreground border border-border shadow-lg",
};

export const TooltipArrowClasses: Record<TooltipVariant, string> = {
  default: "border-border bg-popover",
  dark: "bg-foreground",
  light: "border-border bg-background",
};
