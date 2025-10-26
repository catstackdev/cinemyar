import { forwardRef } from "react";
import type { GridProps } from "./Grid.types";
import { cn } from "@/utils/helpers/classNames";
import { gridCols, gridResponsiveCols, gridGaps } from "./constants";

const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      as: Component = "div",
      cols = 3,
      gap = "md",
      responsive = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const colsClass = responsive ? gridResponsiveCols[cols] : gridCols[cols];

    return (
      <Component
        ref={ref}
        className={cn("grid", colsClass, gridGaps[gap], className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Grid.displayName = "Grid";

export default Grid;
