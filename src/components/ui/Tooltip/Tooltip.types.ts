import type { ReactNode } from "react";

export type TooltipPosition = "top" | "bottom" | "left" | "right";
export type TooltipTrigger = "hover" | "click" | "focus" | "manual";
export type TooltipVariant = "default" | "dark" | "light";

export interface TooltipProps {
  children?: ReactNode;
  content?: ReactNode;
  position?: TooltipPosition;
  trigger?: TooltipTrigger;
  variant?: TooltipVariant;
  delay?: number;
  offset?: number;
  showArrow?: boolean;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  contentClassName?: string;
  maxWidth?: number | string;
}
