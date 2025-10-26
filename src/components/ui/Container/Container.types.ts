import type { ComponentPropsWithoutRef, ElementType } from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  as?: ElementType;
  size?: ContainerSize;
  centered?: boolean;
  className?: string;
}
