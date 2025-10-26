import type { InputHTMLAttributes } from "react";

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string | undefined;
  size?: SwitchSize | undefined;
  disabled?: boolean | undefined;
  className?: string | undefined;
}
