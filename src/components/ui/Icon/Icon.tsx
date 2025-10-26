import { forwardRef } from "react";
import type { IconProps } from "./Icon.types";
import { cn } from "@/utils/helpers/classNames";
import { iconSizes } from "./constants";

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ as: Component = "svg", size = "md", className, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "inline-block shrink-0",
          iconSizes[size],
          className,
        )}
        aria-hidden="true"
        focusable="false"
        {...props}
      />
    );
  },
);

Icon.displayName = "Icon";

export default Icon;
