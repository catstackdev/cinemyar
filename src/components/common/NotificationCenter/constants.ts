export const NotificationPositionClasses = {
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
} as const;

// export const NotificationVariantClasses: Record<NotificationType, string> = {
//   success:
//     "bg-success/10 border-success/30 text-success border-success",
//   error: "bg-danger/10 border-danger/30 text-danger border-danger",
//   warning: "bg-warning/10 border-warning/30 text-warning border-warning",
//   info: "bg-info/10 border-info/30 text-info border-info",
// };
//
// export const NotificationIconClasses: Record<NotificationType, string> = {
//   success: "text-success",
//   error: "text-danger",
//   warning: "text-warning",
//   info: "text-info",
// };

export const NotificationStyles = {
  success: {
    base: "border-success bg-success/10 border-success/30 text-success",
    icon: "text-success",
  },
  error: {
    base: "border-danger bg-danger/10 border-danger/30 text-danger",
    icon: "text-danger",
  },
  warning: {
    base: "border-warning bg-warning/10 border-warning/30 text-warning",
    icon: "text-warning",
  },
  info: {
    base: "border-info bg-info/10 border-info/30 text-info",
    icon: "text-info",
  },
} as const;
