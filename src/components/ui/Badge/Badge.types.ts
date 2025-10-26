import type { ReactNode } from "react";

export type BadgeVariant = "default" | "primary" | "secondary" | "success" | "danger" | "warning" | "info";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends React.ComponentPropsWithoutRef<"span"> {
  children?: ReactNode;
  variant?: BadgeVariant | undefined;
  size?: BadgeSize | undefined;
  className?: string | undefined;
}
