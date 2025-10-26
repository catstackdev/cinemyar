import type { SpinnerSize, SpinnerVariant } from "./Spinner.types";

export const spinnerSizes: Record<SpinnerSize, string> = {
  xs: "h-3 w-3 border",
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-2",
  xl: "h-12 w-12 border-4",
};

export const spinnerVariants: Record<SpinnerVariant, string> = {
  primary: "border-blue-500 border-t-transparent",
  secondary: "border-gray-500 border-t-transparent",
  white: "border-white border-t-transparent",
};
