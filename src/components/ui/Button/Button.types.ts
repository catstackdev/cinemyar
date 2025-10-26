import type { Color } from "@/types/colors";
import type { Size } from "@/types/size";
import type { ReactNode } from "react";

export type ButtonSize = Size;
export type ButtonColor = Color;
export type ButtonVariant = "default" | "outline" | "clear" | "link";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children?: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  loadingText?: string;
  // tooltip?: string | ReactNode;
  // tooltipProps?: Partial<Omit<TooltipProps, "children" | "content">>;
}
