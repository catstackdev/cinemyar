import type { ComponentPropsWithoutRef, ElementType } from "react";

export type StackDirection = "horizontal" | "vertical";
export type StackAlign = "start" | "center" | "end" | "stretch";
export type StackJustify = "start" | "center" | "end" | "between" | "around" | "evenly";
export type StackSpacing = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface StackProps extends ComponentPropsWithoutRef<"div"> {
  as?: ElementType;
  direction?: StackDirection;
  align?: StackAlign;
  justify?: StackJustify;
  spacing?: StackSpacing;
  wrap?: boolean;
  className?: string;
}
