import type { InputHTMLAttributes } from "react";

export type RadioSize = "sm" | "md" | "lg";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string | undefined;
  size?: RadioSize | undefined;
  error?: string | undefined;
  description?: string | undefined;
  className?: string | undefined;
}
