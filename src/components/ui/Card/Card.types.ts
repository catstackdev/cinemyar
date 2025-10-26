import type { ReactNode } from "react";

export interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
  className?: string | undefined;
}
