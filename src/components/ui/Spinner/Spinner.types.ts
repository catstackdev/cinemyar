import type { ComponentPropsWithoutRef } from "react";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerVariant = "primary" | "secondary" | "white";

export interface SpinnerProps extends ComponentPropsWithoutRef<"div"> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  className?: string;
}
