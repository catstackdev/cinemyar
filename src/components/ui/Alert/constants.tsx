import type { AlertVariant } from "./Alert.types";

export const variantClasses: Record<AlertVariant, string> = {
  info: "bg-info/10 border-info/30 text-info",
  success: "bg-success/10 border-success/30 text-success",
  warning: "bg-warning/10 border-warning/30 text-warning",
  danger: "bg-danger/10 border-danger/30 text-danger",
};
