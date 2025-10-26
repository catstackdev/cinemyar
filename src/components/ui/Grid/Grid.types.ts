import type { ComponentPropsWithoutRef, ElementType } from "react";

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 12;
export type GridGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export interface GridProps extends ComponentPropsWithoutRef<"div"> {
  as?: ElementType;
  cols?: GridCols;
  gap?: GridGap;
  responsive?: boolean;
  className?: string;
}
