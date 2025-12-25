import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/helpers/classNames";
import { useDrawerContext } from "./DrawerContext";
import type { DrawerContentProps } from "./Drawer.types";
import {
  DrawerSizeClasses,
  DrawerSideClasses,
  DrawerAnimationClasses,
} from "./constants";
import { X } from "lucide-react";
import { useBodyScrollLock, useFocusRestore } from "@/hooks";

export const DrawerContent = ({
  children,
  side = "right",
  size = "lg",
  className,
  overlayClassName,
  closeOnOverlay = true,
  closeOnEsc = true,
  showCloseButton = true,
  preventScroll = true,
  onClose,
}: DrawerContentProps) => {
  const { isOpen, close, titleId, descriptionId } = useDrawerContext();
  const [isExiting, setIsExiting] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when drawer is open
  useBodyScrollLock(isOpen && preventScroll);

  // Focus management - cast to HTMLElement ref for useFocusRestore
  useFocusRestore(isOpen, drawerRef as React.RefObject<HTMLElement>);

  // Handle close with exit animation
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      close();
      setIsExiting(false);
      onClose?.();
    }, 300); // Match animation duration
  };

  // Close on Escape key
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeOnEsc, isOpen]);

  // Close on overlay click
  const handleOverlayClick = () => {
    if (closeOnOverlay) {
      handleClose();
    }
  };

  // Prevent clicks inside drawer from closing it
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen && !isExiting) return null;

  const sideClass = DrawerSideClasses[side];
  const sizeClass = side === "left" || side === "right" ? DrawerSizeClasses[size] : "";
  const animationClass = isExiting
    ? DrawerAnimationClasses[side].exit
    : DrawerAnimationClasses[side].enter;

  return createPortal(
    <div
      className="fixed inset-0 z-40 flex"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isExiting ? "opacity-0" : "opacity-100",
          overlayClassName,
        )}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={cn(
          "fixed bg-background shadow-2xl border-border flex flex-col",
          sideClass,
          sizeClass,
          animationClass,
          side === "left" && "border-r",
          side === "right" && "border-l",
          side === "top" && "border-b",
          side === "bottom" && "border-t",
          "w-full sm:w-auto", // Full width on mobile, auto on desktop
          className,
        )}
        onClick={handleContentClick}
        tabIndex={-1}
      >
        {/* Close button */}
        {showCloseButton && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {children}
      </div>
    </div>,
    document.body,
  );
};

export default DrawerContent;
