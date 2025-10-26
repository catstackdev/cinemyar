import type { ReactNode } from "react";

export type ErrorSize = "sm" | "md" | "lg";
export type ErrorVariant = "error" | "warning" | "info";

export interface ErrorMessageProps extends React.ComponentPropsWithoutRef<"p"> {
  children?: ReactNode;
  id?: string | undefined;
  size?: ErrorSize | undefined;
  variant?: ErrorVariant | undefined;
  icon?: boolean | undefined;
  className?: string | undefined;
}
