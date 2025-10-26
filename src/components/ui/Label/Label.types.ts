import type { LabelHTMLAttributes, ReactNode } from "react";

export type LabelSize = "sm" | "md" | "lg";
export type LabelWeight = "normal" | "medium" | "semibold" | "bold";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: ReactNode;
  htmlFor?: string | undefined;
  required?: boolean | undefined;
  size?: LabelSize | undefined;
  weight?: LabelWeight | undefined;
  disabled?: boolean | undefined;
  className?: string | undefined;
}
