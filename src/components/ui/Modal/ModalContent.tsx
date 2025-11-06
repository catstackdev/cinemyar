import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import type { ReactNode, RefObject } from "react";
import type {
  ModalSize,
  ModalVariant,
  ModalPlacement,
  ModalAnimation,
  ModalScrollBehavior,
} from "./Modal.types";
import { cn } from "@/utils/helpers/classNames";
import {
  ModalSizeClasses,
  ModalPlacementClasses,
  ModalDrawerClasses,
  ModalAnimationClasses,
  ModalScrollBehaviorClasses,
  BackdropBlurClasses,
  ModalDrawerAnimationClasses,
} from "./constants";
import useModal from "./hook";
import { useModalContext } from "./ModalContext";
import { X } from "lucide-react";

interface ModalContentProps {
  children: ReactNode;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  preventScroll?: boolean;
  size?: ModalSize;
  variant?: ModalVariant;
  placement?: ModalPlacement;
  animation?: ModalAnimation;
  scrollBehavior?: ModalScrollBehavior;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  showCloseButton?: boolean;
  zIndex?: number;
  backdropBlur?: "none" | "sm" | "md" | "lg";
  backdropOpacity?: number;
  initialFocus?: RefObject<HTMLElement>;
  restoreFocus?: boolean;
  container?: HTMLElement;
  onOpen?: () => void;
  onClose?: () => void;
  onExitComplete?: () => void;
}

export const ModalContent = ({
  children,
  closeOnOverlay = true,
  closeOnEsc = true,
  preventScroll = true,
  size = "md",
  variant = "default",
  placement = "center",
  animation = "scale",
  scrollBehavior = "outside",
  className,
  overlayClassName,
  contentClassName,
  showCloseButton = true,
  zIndex = 9999,
  backdropBlur = "sm",
  backdropOpacity = 50,
  initialFocus,
  restoreFocus = true,
  container,
  onOpen,
  onClose,
  onExitComplete,
}: ModalContentProps) => {
  const { isOpen, close, titleId, descriptionId } = useModalContext();
  const [isExiting, setIsExiting] = useState(false);

  const { modalRef, handleOverlayClick, handleContentClick } = useModal({
    ...(isOpen !== undefined && { open: isOpen }),
    onOpenChange: (open) => {
      if (!open) close();
    },
    closeOnOverlay,
    closeOnEsc,
    preventScroll,
    ...(initialFocus && { initialFocus }),
    restoreFocus,
    ...(onOpen && { onOpen }),
    ...(onClose && { onClose }),
  });

  useEffect(() => {
    if (!isOpen && isExiting) {
      const timer = setTimeout(() => {
        setIsExiting(false);
        onExitComplete?.();
      }, 300);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen, isExiting, onExitComplete]);

  useEffect(() => {
    return () => {
      if (isExiting) {
        setIsExiting(false);
      }
    };
  }, [isExiting]);

  const handleClose = () => {
    setIsExiting(true);
    close();
  };

  if (!isOpen && !isExiting) return null;

  const isDrawer = variant === "drawer";
  const drawerPlacement = isDrawer
    ? (placement as "left" | "right" | "top" | "bottom")
    : undefined;

  const getAnimationClasses = () => {
    if (isDrawer && drawerPlacement) {
      return isExiting
        ? ModalDrawerAnimationClasses[drawerPlacement].exit
        : ModalDrawerAnimationClasses[drawerPlacement].enter;
    }
    return isExiting
      ? ModalAnimationClasses[animation].exit
      : ModalAnimationClasses[animation].enter;
  };

  const animationClasses = getAnimationClasses();

  const portalContent = (
    <div
      className={cn(
        "fixed inset-0 flex",
        !isDrawer && ModalPlacementClasses[placement],
        overlayClassName,
      )}
      style={{ zIndex }}
      onClick={handleOverlayClick}
    >
      {/* animationClasses, */}

      <div
        className={cn(
          "absolute inset-0 bg-background",
          BackdropBlurClasses[backdropBlur],
        )}
        style={{ opacity: backdropOpacity / 100 }}
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={cn(
          "relative z-10 bg-card/10 backdrop-blur-sm text-foreground rounded-lg shadow-xl border border-border",
          "flex flex-col",
          animationClasses,
          ModalSizeClasses[size],
          !isDrawer && ModalScrollBehaviorClasses[scrollBehavior],
          isDrawer && drawerPlacement && ModalDrawerClasses[drawerPlacement],
          variant === "alert" && "max-w-md",
          contentClassName,
          className,
        )}
        onClick={handleContentClick}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 p-2  hover:bg-muted transition-colors z-10 rounded-full"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {children}
      </div>
    </div>
  );

  return createPortal(portalContent, container || document.body);
};

export default ModalContent;
