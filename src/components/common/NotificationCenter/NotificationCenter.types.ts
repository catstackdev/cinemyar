import type { Notification } from "@/contexts/NotificationContext";

export interface NotificationCenterProps {
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  maxNotifications?: number;
}

export interface NotificationItemProps {
  notification: Notification;
  onClose: (id: string) => void;
}
