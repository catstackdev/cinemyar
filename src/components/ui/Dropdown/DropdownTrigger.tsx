import { forwardRef } from "react";
import type { DropdownTriggerProps } from "./Dropdown.types";
import { useDropdownContext } from "./DropdownContext";
import { cn } from "@/utils/helpers/classNames";

const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ children, className, ...props }, ref) => {
    const { isOpen, setIsOpen } = useDropdownContext();

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn("inline-flex items-center", className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

DropdownTrigger.displayName = "DropdownTrigger";

export default DropdownTrigger;
