import type { DrawerSide, DrawerSize } from "./Drawer.types";

export const DrawerSizeClasses: Record<DrawerSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full",
};

export const DrawerSideClasses: Record<DrawerSide, string> = {
  left: "left-0 top-0 h-full",
  right: "right-0 top-0 h-full",
  top: "top-0 left-0 w-full",
  bottom: "bottom-0 left-0 w-full",
};

export const DrawerAnimationClasses: Record<DrawerSide, { enter: string; exit: string }> = {
  left: {
    enter: "animate-in slide-in-from-left duration-300",
    exit: "animate-out slide-out-to-left duration-300",
  },
  right: {
    enter: "animate-in slide-in-from-right duration-300",
    exit: "animate-out slide-out-to-right duration-300",
  },
  top: {
    enter: "animate-in slide-in-from-top duration-300",
    exit: "animate-out slide-out-to-top duration-300",
  },
  bottom: {
    enter: "animate-in slide-in-from-bottom duration-300",
    exit: "animate-out slide-out-to-bottom duration-300",
  },
};
