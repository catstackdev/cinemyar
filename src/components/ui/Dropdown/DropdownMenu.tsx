import { forwardRef, useEffect, useRef } from "react";
import type { DropdownMenuProps } from "./Dropdown.types";
import { useDropdownContext } from "./DropdownContext";
import { cn } from "@/utils/helpers/classNames";
import { dropdownAligns } from "./constants";

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ align = "start", className, children, ...props }, ref) => {
    const { isOpen, setIsOpen } = useDropdownContext();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (isOpen && menuRef.current) {
        const firstItem = menuRef.current.querySelector<HTMLButtonElement>(
          'button:not([disabled])'
        );
        firstItem?.focus();
      }
    }, [isOpen]);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (!isOpen || !menuRef.current) return;

        const items = Array.from(
          menuRef.current.querySelectorAll<HTMLButtonElement>(
            'button:not([disabled])'
          )
        );

        if (items.length === 0) return;

        const currentIndex = items.findIndex((item) => item === document.activeElement);

        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            const nextIndex = (currentIndex + 1) % items.length;
            items[nextIndex]?.focus();
            break;
          case "ArrowUp":
            event.preventDefault();
            const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
            items[prevIndex]?.focus();
            break;
          case "Home":
            event.preventDefault();
            items[0]?.focus();
            break;
          case "End":
            event.preventDefault();
            items[items.length - 1]?.focus();
            break;
          case "Enter":
          case " ":
            event.preventDefault();
            (document.activeElement as HTMLButtonElement)?.click();
            break;
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
      }

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, setIsOpen]);

    if (!isOpen) return null;

    return (
      <div
        ref={(node) => {
          menuRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        role="menu"
        className={cn(
          "absolute z-50 mt-2 min-w-[12rem] rounded-md border border-gray-200 bg-white shadow-lg",
          dropdownAligns[align],
          className,
        )}
        {...props}
      >
        <div className="py-1">{children}</div>
      </div>
    );
  },
);

DropdownMenu.displayName = "DropdownMenu";

export default DropdownMenu;
