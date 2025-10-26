import { forwardRef } from "react";
import type { StackProps } from "./Stack.types";
import { cn } from "@/utils/helpers/classNames";
import { stackDirections, stackAligns, stackJustifies, stackSpacings } from "./constants";

const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      as: Component = "div",
      direction = "vertical",
      align = "stretch",
      justify = "start",
      spacing = "md",
      wrap = false,
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
          "flex",
          stackDirections[direction],
          stackAligns[align],
          stackJustifies[justify],
          stackSpacings[spacing],
          wrap && "flex-wrap",
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Stack.displayName = "Stack";

export default Stack;
