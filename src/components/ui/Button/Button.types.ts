import type { Color } from "@/types/colors";
import type { Size } from "@/types/size";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export type ButtonSize = Size;
export type ButtonColor = Color;
export type ButtonVariant = "default" | "outline" | "clear" | "link" | "gradient" | "glass";
export type ButtonElevation = "none" | "sm" | "md" | "lg";

export type PolymorphicRef<C extends ElementType> =
  ComponentPropsWithoutRef<C>["ref"];

export type PolymorphicComponentProps<
  C extends ElementType,
  Props = object
> = {
  as?: C;
} & Props &
  Omit<ComponentPropsWithoutRef<C>, keyof Props | "as">;

export interface BaseButtonProps {
  children?: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  loadingText?: string;
  iconOnly?: boolean;
  elevation?: ButtonElevation;
  withRipple?: boolean;
  withPulse?: boolean;
}

export type ButtonProps<C extends ElementType = "button"> =
  PolymorphicComponentProps<C, BaseButtonProps>;
