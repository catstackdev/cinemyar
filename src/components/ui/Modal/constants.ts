import type {
  ModalPlacement,
  ModalAnimation,
  ModalScrollBehavior,
} from "./Modal.types";

export const ModalSizeClasses = {
  sm: "max-w-sm w-full mx-4",
  md: "max-w-md w-full mx-4",
  lg: "max-w-lg w-full mx-4",
  xl: "max-w-2xl w-full mx-4",
  full: "w-full h-full max-w-none rounded-none m-0",
};

export const ModalPlacementClasses: Record<ModalPlacement, string> = {
  center: "items-center justify-center",
  top: "items-start justify-center pt-20",
  bottom: "items-end justify-center pb-8",
  left: "items-center justify-start",
  right: "items-center justify-end",
};

export const ModalDrawerClasses: Record<
  "left" | "right" | "top" | "bottom",
  string
> = {
  left: "h-full rounded-none rounded-r-lg",
  right: "h-full rounded-none rounded-l-lg",
  top: "w-full rounded-none rounded-b-lg",
  bottom: "w-full rounded-none rounded-t-lg",
};

export const ModalAnimationClasses: Record<
  ModalAnimation,
  { enter: string; exit: string }
> = {
  fade: {
    enter: "animate-fade-in",
    exit: "animate-fade-out",
  },
  scale: {
    enter: "animate-scale-in",
    exit: "opacity-0 scale-95",
  },
  slide: {
    enter: "animate-slide-in-up",
    exit: "translate-y-4 opacity-0",
  },
  none: {
    enter: "",
    exit: "",
  },
};

export const ModalDrawerAnimationClasses: Record<
  "left" | "right" | "top" | "bottom",
  { enter: string; exit: string }
> = {
  left: {
    enter: "animate-slide-in-right",
    exit: "-translate-x-full opacity-0",
  },
  right: {
    enter: "animate-slide-in-left",
    exit: "translate-x-full opacity-0",
  },
  top: {
    enter: "animate-slide-in-down",
    exit: "-translate-y-full opacity-0",
  },
  bottom: {
    enter: "animate-slide-in-up",
    exit: "translate-y-full opacity-0",
  },
};

export const ModalScrollBehaviorClasses: Record<ModalScrollBehavior, string> = {
  inside: "max-h-[90vh] flex flex-col",
  outside: "max-h-[90vh] overflow-y-auto",
};

export const BackdropBlurClasses = {
  none: "",
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
};
