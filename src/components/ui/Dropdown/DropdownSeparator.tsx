import { forwardRef } from "react";
import type { DropdownSeparatorProps } from "./Dropdown.types";
import { cn } from "@/utils/helpers/classNames";

const DropdownSeparator = forwardRef<HTMLDivElement, DropdownSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn("my-1 border-t border-gray-200", className)}
        {...props}
      />
    );
  },
);

DropdownSeparator.displayName = "DropdownSeparator";

export default DropdownSeparator;
