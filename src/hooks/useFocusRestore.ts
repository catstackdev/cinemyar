import { useEffect, useRef } from "react";

export function useFocusRestore(
  isOpen: boolean,
  modalRef: React.RefObject<HTMLElement>,
) {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }

      return () => {
        previousActiveElement.current?.focus();
      };
    }
    return undefined;
  }, [isOpen, modalRef]);
}
