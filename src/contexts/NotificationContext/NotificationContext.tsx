import { useState, useCallback, type ReactNode } from "react";
import { NotificationContext } from "./context";
import type { Notification } from "./NotificationContext.types";

let notificationId = 0;

export const NotificationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (notification: Omit<Notification, "id">) => {
      const id = `notification-${++notificationId}`;
      const newNotification: Notification = {
        id,
        duration: 5000,
        ...notification,
      };

      setNotifications((prev) => [...prev, newNotification]);

      if (newNotification.duration && newNotification.duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, newNotification.duration);
      }
    },
    [],
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification, clearAll }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
