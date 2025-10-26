import { cloneElement, isValidElement } from "react";
import type { ReactNode, ReactElement } from "react";
import { cn } from "@/utils/helpers/classNames";
import { useModalContext } from "./ModalContext";

export interface ModalTriggerProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export const ModalTrigger = ({
  children,
  asChild,
  className,
}: ModalTriggerProps) => {
  const { open, isOpen, titleId } = useModalContext();

  // Auto-detect if child is a button-like component (Button, IconButton, etc.)
  const shouldUseAsChild = asChild ?? (isValidElement(children) && typeof children.type !== 'string');

  if (shouldUseAsChild && isValidElement(children)) {
    const child = children as ReactElement<{
      onClick?: (e: React.MouseEvent) => void;
      className?: string;
    }>;
    
    const childOnClick = child.props.onClick;
    const mergedOnClick = (e: React.MouseEvent) => {
      childOnClick?.(e);
      if (!e.defaultPrevented) {
        open();
      }
    };

    return cloneElement(child, {
      onClick: mergedOnClick,
      "aria-haspopup": "dialog" as const,
      "aria-expanded": isOpen,
      "aria-controls": isOpen ? titleId : undefined,
      className: cn(child.props.className, className),
    } as Partial<typeof child.props>);
  }

  return (
    <button
      type="button"
      onClick={open}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={isOpen ? titleId : undefined}
      className={cn(
        "inline-flex items-center justify-center rounded px-4 py-2",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default ModalTrigger;
