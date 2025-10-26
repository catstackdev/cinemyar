import { useRef, useState, useEffect, useCallback } from "react";
import type { UseModalProps } from "./useModal.types";

export const useModal = ({
  open: controlledOpen,
  onOpenChange,
  closeOnOverlay = true,
  closeOnEsc = true,
  preventScroll = true,
  initialFocus,
  restoreFocus = true,
  onOpen,
  onClose,
}: UseModalProps = {}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (open: boolean) => {
      if (!isControlled) {
        setInternalOpen(open);
      }
      onOpenChange?.(open);
      if (open) {
        onOpen?.();
      } else {
        onClose?.();
      }
    },
    [isControlled, onOpenChange, onOpen, onClose],
  );

  const openModal = useCallback(() => setOpen(true), [setOpen]);
  const closeModal = useCallback(() => setOpen(false), [setOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen && preventScroll) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      return () => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      };
    }
    return undefined;
  }, [isOpen, preventScroll]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;

      setTimeout(() => {
        if (initialFocus?.current) {
          initialFocus.current.focus();
        } else {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );

          if (focusableElements && focusableElements.length > 0) {
            (focusableElements[0] as HTMLElement).focus();
          }
        }
      }, 0);

      return () => {
        if (restoreFocus) {
          previousActiveElement.current?.focus();
        }
      };
    }
    return undefined;
  }, [isOpen, initialFocus, restoreFocus]);

  // ESC key handler
  useEffect(() => {
    if (isOpen && closeOnEsc) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeModal();
        }
      };

      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
    return undefined;
  }, [isOpen, closeOnEsc, closeModal]);

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== "Tab" || !modalRef.current) return;

        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      };

      document.addEventListener("keydown", handleTabKey);
      return () => document.removeEventListener("keydown", handleTabKey);
    }
    return undefined;
  }, [isOpen]);

  const handleOverlayClick = useCallback(() => {
    if (closeOnOverlay) {
      closeModal();
    }
  }, [closeOnOverlay, closeModal]);

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return {
    isOpen,
    modalRef,
    openModal,
    closeModal,
    handleOverlayClick,
    handleContentClick,
  };
};
