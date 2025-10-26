import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface EmptyStateProps extends ComponentPropsWithoutRef<"div"> {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}
