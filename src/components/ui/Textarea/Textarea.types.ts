import type { ComponentPropsWithoutRef } from "react";

export type TextareaResize = "none" | "vertical" | "horizontal" | "both";

export interface TextareaProps extends ComponentPropsWithoutRef<"textarea"> {
  resize?: TextareaResize;
  error?: boolean;
  className?: string;
}
