import { useNotification } from "@/contexts/NotificationContext";
import { cn } from "@/utils/helpers/classNames";
import NotificationItem from "./NotificationItem";
import type { NotificationCenterProps } from "./NotificationCenter.types";
import { NotificationPositionClasses } from "./constants";

const NotificationCenter = ({
  position = "top-right",
  maxNotifications = 5,
}: NotificationCenterProps) => {
  const { notifications, removeNotification } = useNotification();

  const visibleNotifications = notifications.slice(-maxNotifications);

  if (visibleNotifications.length === 0) return null;

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col gap-3",
        NotificationPositionClasses[position],
      )}
    >
      {visibleNotifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={removeNotification}
        />
      ))}
    </div>
  );
};

export default NotificationCenter;
