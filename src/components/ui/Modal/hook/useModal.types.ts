import type { RefObject } from "react";

export interface UseModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  preventScroll?: boolean;
  initialFocus?: RefObject<HTMLElement>;
  restoreFocus?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}
