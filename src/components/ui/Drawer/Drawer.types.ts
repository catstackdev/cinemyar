export type DrawerSide = "left" | "right" | "top" | "bottom";
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface DrawerContextValue {
  titleId: string;
  descriptionId: string;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export interface DrawerRootProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

export interface DrawerContentProps {
  children: React.ReactNode;
  side?: DrawerSide;
  size?: DrawerSize;
  className?: string;
  overlayClassName?: string;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  preventScroll?: boolean;
  onClose?: () => void;
}

export interface DrawerHeaderProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  className?: string;
}

export interface DrawerBodyProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  className?: string;
}

export interface DrawerFooterProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  className?: string;
}

export interface DrawerTitleProps extends React.ComponentPropsWithoutRef<"h2"> {
  children: React.ReactNode;
  className?: string;
}

export interface DrawerDescriptionProps extends React.ComponentPropsWithoutRef<"p"> {
  children: React.ReactNode;
  className?: string;
}

export interface DrawerCloseProps extends React.ComponentPropsWithoutRef<"button"> {
  children?: React.ReactNode;
  className?: string;
}
