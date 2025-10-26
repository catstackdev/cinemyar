import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ToastVariant = "info" | "warning" | "error" | "success";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastProps extends ComponentPropsWithoutRef<"div"> {
  variant?: ToastVariant;
  title?: string;
  message?: string;
  icon?: ReactNode;
  duration?: number;
  onClose?: () => void;
  className?: string;
  children?: ReactNode;
}

export interface ToastContainerProps {
  position?: ToastPosition;
  className?: string;
}
