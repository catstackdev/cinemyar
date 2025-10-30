import type { ButtonColor, ButtonSize, ButtonVariant, ButtonElevation } from "./Button.types";
import type { LoadingSize } from "../Loading/Loading.types";

export const buttonVariants: Record<
  ButtonVariant,
  Record<ButtonColor, string>
> = {
  default: {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98]",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary-foreground/10 active:bg-secondary/80 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98]",
    danger:
      "bg-danger text-danger-foreground hover:bg-danger/90 active:bg-danger/80 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98]",
    success:
      "bg-success text-success-foreground hover:bg-success/90 active:bg-success/80 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98]",
    info: "bg-info text-info-foreground hover:bg-info/90 active:bg-info/80 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98]",
    warning:
      "bg-warning text-warning-foreground hover:bg-warning/90 active:bg-warning/80 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98]",
  },
  outline: {
    primary:
      "border-2 border-primary text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98]",
    secondary:
      "border-2 border-secondary-foreground text-secondary-foreground bg-transparent hover:bg-secondary/90 active:bg-secondary/20 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98]",
    danger:
      "border-2 border-danger text-danger bg-transparent hover:bg-danger/10 active:bg-danger/20 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98]",
    success:
      "border-2 border-success text-success bg-transparent hover:bg-success/10 active:bg-success/20 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98]",
    info: "border-2 border-info text-info bg-transparent hover:bg-info/10 active:bg-info/20 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98]",
    warning:
      "border-2 border-warning text-warning bg-transparent hover:bg-warning/10 active:bg-warning/20 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98]",
  },
  clear: {
    primary:
      "text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98]",
    secondary:
      "text-secondary bg-transparent hover:bg-secondary/10 active:bg-secondary/20 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98]",
    danger:
      "text-danger bg-transparent hover:bg-danger/10 active:bg-danger/20 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98]",
    success:
      "text-success bg-transparent hover:bg-success/10 active:bg-success/20 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98]",
    info: "text-info bg-transparent hover:bg-info/10 active:bg-info/20 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98]",
    warning:
      "text-warning bg-transparent hover:bg-warning/10 active:bg-warning/20 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98]",
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
  gradient: {
    primary:
      "bg-gradient-to-r from-primary-500 to-primary-700 text-white hover:from-primary-600 hover:to-primary-800 active:from-primary-700 active:to-primary-900 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl transition-all",
    secondary:
      "bg-gradient-to-r from-secondary-400 to-secondary-600 text-white hover:from-secondary-500 hover:to-secondary-700 active:from-secondary-600 active:to-secondary-800 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl transition-all",
    danger:
      "bg-gradient-to-r from-danger-500 to-danger-700 text-white hover:from-danger-600 hover:to-danger-800 active:from-danger-700 active:to-danger-900 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl transition-all",
    success:
      "bg-gradient-to-r from-success-500 to-success-700 text-white hover:from-success-600 hover:to-success-800 active:from-success-700 active:to-success-900 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl transition-all",
    info: "bg-gradient-to-r from-info-500 to-info-700 text-white hover:from-info-600 hover:to-info-800 active:from-info-700 active:to-info-900 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl transition-all",
    warning:
      "bg-gradient-to-r from-warning-500 to-warning-700 text-white hover:from-warning-600 hover:to-warning-800 active:from-warning-700 active:to-warning-900 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl transition-all",
  },
  glass: {
    primary:
      "bg-primary/20 backdrop-blur-md border border-primary/30 text-primary hover:bg-primary/30 active:bg-primary/40 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98] shadow-lg transition-all",
    secondary:
      "bg-card/60 backdrop-blur-md border border-border/40 text-card-foreground hover:bg-card/70 active:bg-card/80 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98] shadow-lg transition-all",
    danger:
      "bg-danger/20 backdrop-blur-md border border-danger/30 text-danger hover:bg-danger/30 active:bg-danger/40 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98] shadow-lg transition-all",
    success:
      "bg-success/20 backdrop-blur-md border border-success/30 text-success hover:bg-success/30 active:bg-success/40 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98] shadow-lg transition-all",
    info: "bg-info/20 backdrop-blur-md border border-info/30 text-info hover:bg-info/30 active:bg-info/40 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98] shadow-lg transition-all",
    warning:
      "bg-warning/20 backdrop-blur-md border border-warning/30 text-warning hover:bg-warning/30 active:bg-warning/40 focus-visible:ring-[hsl(var(--ring))] hover:scale-[1.02] active:scale-[0.98] shadow-lg transition-all",
  },
};

export const buttonSizes: Record<ButtonSize, string> = {
  xs: "px-2 py-1.5 text-xs",
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
  xl: "px-8 py-3 text-lg",
};

export const iconOnlySizes: Record<ButtonSize, string> = {
  xs: "p-1.5",
  sm: "p-2",
  md: "p-2.5",
  lg: "p-3",
  xl: "p-4",
};

export const elevationClasses: Record<ButtonElevation, string> = {
  none: "",
  sm: "shadow-sm hover:shadow-md",
  md: "shadow-md hover:shadow-lg",
  lg: "shadow-lg hover:shadow-xl",
};

export const loadingSize: Record<ButtonSize, LoadingSize> = {
  xs: "xs",
  sm: "xs",
  md: "sm",
  lg: "md",
  xl: "lg",
};
