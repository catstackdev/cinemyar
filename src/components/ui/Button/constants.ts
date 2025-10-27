import type { ButtonColor, ButtonSize, ButtonVariant } from "./Button.types";
import type { LoadingSize } from "../Loading/Loading.types";

export const buttonVariants: Record<
  ButtonVariant,
  Record<ButtonColor, string>
> = {
  default: {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 focus-visible:ring-[hsl(var(--ring))]",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary-foreground/10 active:bg-secondary/80 focus-visible:ring-[hsl(var(--ring))]",
    danger:
      "bg-danger text-danger-foreground hover:bg-danger/90 active:bg-danger/80 focus-visible:ring-[hsl(var(--ring))]",
    success:
      "bg-success text-success-foreground hover:bg-success/90 active:bg-success/80 focus-visible:ring-[hsl(var(--ring))]",
    info: "bg-info text-info-foreground hover:bg-info/90 active:bg-info/80 focus-visible:ring-[hsl(var(--ring))]",
    warning:
      "bg-warning text-warning-foreground hover:bg-warning/90 active:bg-warning/80 focus-visible:ring-[hsl(var(--ring))]",
  },
  outline: {
    primary:
      "border-2 border-primary text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20 focus-visible:ring-[hsl(var(--ring))]",
    secondary:
      "border-2 border-secondary-foreground text-secondary-foreground bg-transparent hover:bg-secondary/90 active:bg-secondary/20 focus-visible:ring-[hsl(var(--ring))]",
    danger:
      "border-2 border-danger text-danger bg-transparent hover:bg-danger/10 active:bg-danger/20 focus-visible:ring-[hsl(var(--ring))]",
    success:
      "border-2 border-success text-success bg-transparent hover:bg-success/10 active:bg-success/20 focus-visible:ring-[hsl(var(--ring))]",
    info: "border-2 border-info text-info bg-transparent hover:bg-info/10 active:bg-info/20 focus-visible:ring-[hsl(var(--ring))]",
    warning:
      "border-2 border-warning text-warning bg-transparent hover:bg-warning/10 active:bg-warning/20 focus-visible:ring-[hsl(var(--ring))]",
  },
  clear: {
    primary:
      "text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20 focus-visible:ring-[hsl(var(--ring))]",
    secondary:
      "text-secondary bg-transparent hover:bg-secondary/10 active:bg-secondary/20 focus-visible:ring-[hsl(var(--ring))]",
    danger:
      "text-danger bg-transparent hover:bg-danger/10 active:bg-danger/20 focus-visible:ring-[hsl(var(--ring))]",
    success:
      "text-success bg-transparent hover:bg-success/10 active:bg-success/20 focus-visible:ring-[hsl(var(--ring))]",
    info: "text-info bg-transparent hover:bg-info/10 active:bg-info/20 focus-visible:ring-[hsl(var(--ring))]",
    warning:
      "text-warning bg-transparent hover:bg-warning/10 active:bg-warning/20 focus-visible:ring-[hsl(var(--ring))]",
  },
  link: {
    primary:
      "text-primary bg-transparent hover:underline focus-visible:ring-[hsl(var(--ring))] px-0",
    secondary:
      "text-secondary bg-transparent hover:underline focus-visible:ring-[hsl(var(--ring))] px-0",
    danger:
      "text-danger bg-transparent hover:underline focus-visible:ring-[hsl(var(--ring))] px-0",
    success:
      "text-success bg-transparent hover:underline focus-visible:ring-[hsl(var(--ring))] px-0",
    info: "text-info bg-transparent hover:underline focus-visible:ring-[hsl(var(--ring))] px-0",
    warning:
      "text-warning bg-transparent hover:underline focus-visible:ring-[hsl(var(--ring))] px-0",
  },
};
export const buttonSizes: Record<ButtonSize, string> = {
  xs: "px-2 py-1.5 text-xs",
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
  xl: "px-8 py-3 text-lg",
};

export const loadingSize: Record<ButtonSize, LoadingSize> = {
  xs: "xs",
  sm: "xs",
  md: "sm",
  lg: "md",
  xl: "lg",
};
