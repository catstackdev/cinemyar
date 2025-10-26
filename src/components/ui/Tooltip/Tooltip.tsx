import { useRef, useState, useEffect, useCallback } from "react";
import type { TooltipProps, TooltipPosition } from "./Tooltip.types";
import { cn } from "@/utils/helpers/classNames";
import { createPortal } from "react-dom";
import { TooltipVariantClasses, TooltipArrowClasses } from "./constants";

let tooltipIdCounter = 0;

const Tooltip = ({
  content,
  children,
  position = "top",
  trigger = "hover",
  variant = "default",
  delay = 0,
  offset = 8,
  showArrow = true,
  disabled = false,
  open: controlledOpen,
  onOpenChange,
  className,
  contentClassName,
  maxWidth = 300,
}: TooltipProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [computedPosition, setComputedPosition] =
    useState<TooltipPosition>(position);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipIdRef = useRef<string>(`tooltip-${++tooltipIdCounter}`);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (open: boolean) => {
      if (disabled) return;
      if (!isControlled) {
        setInternalOpen(open);
      }
      onOpenChange?.(open);
    },
    [disabled, isControlled, onOpenChange],
  );

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let finalPosition = position;
    let top = 0;
    let left = 0;

    const positions = {
      top: {
        top: triggerRect.top - tooltipRect.height - offset,
        left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
      },
      bottom: {
        top: triggerRect.bottom + offset,
        left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
      },
      left: {
        top: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
        left: triggerRect.left - tooltipRect.width - offset,
      },
      right: {
        top: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
        left: triggerRect.right + offset,
      },
    };

    const pos = positions[position];
    top = pos.top;
    left = pos.left;

    if (position === "top" && top < 0) {
      finalPosition = "bottom";
      top = positions.bottom.top;
      left = positions.bottom.left;
    } else if (
      position === "bottom" &&
      top + tooltipRect.height > viewportHeight
    ) {
      finalPosition = "top";
      top = positions.top.top;
      left = positions.top.left;
    } else if (position === "left" && left < 0) {
      finalPosition = "right";
      top = positions.right.top;
      left = positions.right.left;
    } else if (
      position === "right" &&
      left + tooltipRect.width > viewportWidth
    ) {
      finalPosition = "left";
      top = positions.left.top;
      left = positions.left.left;
    }

    if (left < 0) left = 8;
    if (left + tooltipRect.width > viewportWidth) {
      left = viewportWidth - tooltipRect.width - 8;
    }

    setComputedPosition(finalPosition);
    setCoords({ top, left });
  }, [position, offset]);

  const showTooltip = useCallback(() => {
    if (disabled) return;
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => setOpen(true), delay);
    } else {
      setOpen(true);
    }
  }, [delay, disabled, setOpen]);

  const hideTooltip = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setOpen(false);
  }, [setOpen]);

  const toggleTooltip = useCallback(() => {
    if (isOpen) {
      hideTooltip();
    } else {
      showTooltip();
    }
  }, [isOpen, showTooltip, hideTooltip]);

  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      const handleResize = () => calculatePosition();
      const handleScroll = () => calculatePosition();

      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll, true);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll, true);
      };
    }
    return undefined;
  }, [isOpen, calculatePosition]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (trigger === "click" && isOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node) &&
          tooltipRef.current &&
          !tooltipRef.current.contains(e.target as Node)
        ) {
          hideTooltip();
        }
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          hideTooltip();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
    return undefined;
  }, [trigger, isOpen, hideTooltip]);

  const triggerProps = {
    ref: triggerRef,
    "aria-describedby": isOpen ? tooltipIdRef.current : undefined,
    ...(trigger === "hover" && {
      onMouseEnter: showTooltip,
      onMouseLeave: hideTooltip,
      onFocus: showTooltip,
      onBlur: hideTooltip,
    }),
    ...(trigger === "click" && {
      onClick: toggleTooltip,
    }),
    ...(trigger === "focus" && {
      onFocus: showTooltip,
      onBlur: hideTooltip,
    }),
  };

  const getArrowClasses = () => {
    const baseClasses = "absolute w-2 h-2 rotate-45";
    const colorClasses = TooltipArrowClasses[variant];

    switch (computedPosition) {
      case "top":
        return cn(
          baseClasses,
          colorClasses,
          "bottom-[-4px] left-1/2 -translate-x-1/2",
          variant === "default" && "border-b border-r",
        );
      case "bottom":
        return cn(
          baseClasses,
          colorClasses,
          "top-[-4px] left-1/2 -translate-x-1/2",
          variant === "default" && "border-t border-l",
        );
      case "left":
        return cn(
          baseClasses,
          colorClasses,
          "right-[-4px] top-1/2 -translate-y-1/2",
          variant === "default" && "border-r border-t",
        );
      case "right":
        return cn(
          baseClasses,
          colorClasses,
          "left-[-4px] top-1/2 -translate-y-1/2",
          variant === "default" && "border-l border-b",
        );
      default:
        return baseClasses;
    }
  };

  const maxWidthStyle =
    typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;

  return (
    <>
      <div className={cn("inline-block", className)} {...triggerProps}>
        {children}
      </div>
      {isOpen &&
        !disabled &&
        createPortal(
          <div
            ref={tooltipRef}
            id={tooltipIdRef.current}
            role="tooltip"
            className={cn(
              "fixed z-50 rounded px-3 py-2 text-sm shadow-md",
              "animate-fade-in",
              TooltipVariantClasses[variant],
              contentClassName,
            )}
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              maxWidth: maxWidthStyle,
            }}
          >
            {content}
            {showArrow && <div className={getArrowClasses()} />}
          </div>,
          document.body,
        )}
    </>
  );
};

export default Tooltip;
