import type { ComponentPropsWithoutRef, ElementType } from "react";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconProps extends ComponentPropsWithoutRef<"svg"> {
  as?: ElementType;
  size?: IconSize;
  className?: string;
}
