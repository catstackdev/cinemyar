import type { ReactNode } from "react";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
  variant?: AlertVariant | undefined;
  title?: string | undefined;
  onClose?: (() => void) | undefined;
  className?: string | undefined;
}
