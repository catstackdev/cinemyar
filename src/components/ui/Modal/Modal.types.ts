import type { ReactNode } from "react";

export type ModalSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  // | "5xl"
  // | "6xl"
  // | "7xl"
  | "full";
export type ModalVariant = "default" | "drawer" | "alert";
export type ModalPlacement = "center" | "top" | "bottom" | "left" | "right";
export type ModalAnimation = "fade" | "scale" | "slide" | "none";
export type ModalScrollBehavior = "inside" | "outside";
export type BackdropBlur = "none" | "sm" | "md" | "lg";

export interface ModalProps {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  className?: string;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  preventScroll?: boolean;
  size?: ModalSize;
  variant?: ModalVariant;
  placement?: ModalPlacement;
  animation?: ModalAnimation;
  scrollBehavior?: ModalScrollBehavior;
  overlayClassName?: string;
  contentClassName?: string;
  showCloseButton?: boolean;
  zIndex?: number;
  backdropBlur?: BackdropBlur;
  backdropOpacity?: number;
  initialFocus?: React.RefObject<HTMLElement>;
  restoreFocus?: boolean;
  container?: HTMLElement;
  onOpen?: () => void;
  onClose?: () => void;
  onExitComplete?: () => void;
}

export interface ModalContextValue {
  titleId: string;
  descriptionId: string;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}
