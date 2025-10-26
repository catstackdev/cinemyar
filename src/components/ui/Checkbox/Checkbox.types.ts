import type { InputHTMLAttributes } from "react";

export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string | undefined;
  size?: CheckboxSize | undefined;
  error?: string | undefined;
  indeterminate?: boolean | undefined;
  className?: string | undefined;
}
