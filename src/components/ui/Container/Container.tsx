import { forwardRef } from "react";
import type { ContainerProps } from "./Container.types";
import { cn } from "@/utils/helpers/classNames";
import { containerSizes } from "./constants";

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      as: Component = "div",
      size = "lg",
      centered = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "w-full px-4 sm:px-6 lg:px-8",
          containerSizes[size],
          centered && "mx-auto",
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Container.displayName = "Container";

export default Container;
