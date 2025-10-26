import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ChipVariant = "default" | "primary" | "success" | "warning" | "danger";
export type ChipSize = "sm" | "md" | "lg";

export interface ChipProps extends ComponentPropsWithoutRef<"div"> {
  variant?: ChipVariant;
  size?: ChipSize;
  onRemove?: () => void;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}
