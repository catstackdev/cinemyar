import type { StackDirection, StackAlign, StackJustify, StackSpacing } from "./Stack.types";

export const stackDirections: Record<StackDirection, string> = {
  horizontal: "flex-row",
  vertical: "flex-col",
};

export const stackAligns: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export const stackJustifies: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

export const stackSpacings: Record<StackSpacing, string> = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-12",
};
