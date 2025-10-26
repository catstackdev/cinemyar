import type { SwitchSize } from "./Switch.types";

export const sizeClasses: Record<SwitchSize, string> = {
  sm: "w-9 h-5 after:top-[2px] after:left-[2px] after:h-4 after:w-4",
  md: "w-11 h-6 after:top-[2px] after:left-[2px] after:h-5 after:w-5",
  lg: "w-14 h-7 after:top-0.5 after:left-[4px] after:h-6 after:w-6",
};

export const toggleClasses: Record<SwitchSize, string> = {
  sm: "peer-checked:after:translate-x-4",
  md: "peer-checked:after:translate-x-full",
  lg: "peer-checked:after:translate-x-full",
};
