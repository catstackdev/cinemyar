import { forwardRef } from "react";
import type { DropdownItemProps } from "./Dropdown.types";
import { useDropdownContext } from "./DropdownContext";
import { cn } from "@/utils/helpers/classNames";

const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  (
    {
      icon,
      destructive = false,
      disabled = false,
      className,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const { setIsOpen } = useDropdownContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        onClick?.(e);
        setIsOpen(false);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors",
          "focus:outline-none focus:bg-gray-100",
          destructive
            ? "text-red-600 hover:bg-red-50"
            : "text-gray-700 hover:bg-gray-100",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  },
);

DropdownItem.displayName = "DropdownItem";

export default DropdownItem;
