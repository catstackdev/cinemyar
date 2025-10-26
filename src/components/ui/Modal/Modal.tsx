import { createPortal } from "react-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import type { ModalProps } from "./Modal.types";
import { cn } from "@/utils/helpers/classNames";
import {
  ModalSizeClasses,
  ModalPlacementClasses,
  ModalDrawerClasses,
  ModalAnimationClasses,
  ModalScrollBehaviorClasses,
  BackdropBlurClasses,
} from "./constants";
import { ModalDrawerAnimationClasses } from "./constants";
import useModal from "./hook";
import { ModalContext } from "./ModalContext";
import { X } from "lucide-react";

let modalIdCounter = 0;

const Modal = ({
  children,
  open: controlledOpen,
  onOpenChange,
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
  zIndex = 50,
  backdropBlur = "sm",
  backdropOpacity = 50,
  initialFocus,
  restoreFocus = true,
  container,
  onOpen,
  onClose,
  onExitComplete,
}: ModalProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [titleId] = useState(`modal-title-${++modalIdCounter}`);
  const [descriptionId] = useState(`modal-desc-${modalIdCounter}`);

  const {
    isOpen,
    modalRef,
    closeModal,
    handleOverlayClick,
    handleContentClick,
  } = useModal({
    ...(controlledOpen !== undefined && { open: controlledOpen }),
    ...(onOpenChange && { onOpenChange }),
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

  const handleClose = useCallback(() => {
    setIsExiting(true);
    closeModal();
  }, [closeModal]);

  const openModal = useCallback(() => {
    if (onOpenChange) {
      onOpenChange(true);
    }
  }, [onOpenChange]);

  const contextValue = useMemo(
    () => ({
      titleId,
      descriptionId,
      isOpen,
      open: openModal,
      close: handleClose,
    }),
    [titleId, descriptionId, isOpen, openModal, handleClose],
  );

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
    <ModalContext.Provider value={contextValue}>
      <div
        className={cn(
          "fixed inset-0 flex",
          !isDrawer && ModalPlacementClasses[placement],
          animationClasses,
          overlayClassName,
        )}
        style={{ zIndex }}
        onClick={handleOverlayClick}
      >
        <div
          className={cn(
            "absolute inset-0 bg-background/80",
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
            "relative z-10 bg-background text-foreground rounded-lg shadow-xl border border-border",
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
              className="absolute top-4 right-4 p-1 rounded-md hover:bg-muted transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );

  return createPortal(portalContent, container || document.body);
};

export default Modal;
