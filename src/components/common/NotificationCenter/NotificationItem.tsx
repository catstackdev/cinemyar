import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/utils/helpers/classNames";
import type { NotificationItemProps } from "./NotificationCenter.types";
import { NotificationStyles } from "./constants";

const NotificationItem = ({ notification, onClose }: NotificationItemProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (notification.duration && notification.duration > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => onClose(notification.id), 3000);
      }, notification.duration);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [notification.duration, notification.id, onClose]);

  const iconMap = {
    success: CheckCircle2,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const Icon = iconMap[notification.type];

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "relative flex w-80 items-start gap-3 rounded-lg border p-4 shadow-lg",
        "backdrop-blur-lg  ",
        "transition-all duration-300",
        isExiting ? "translate-x-full opacity-10" : "translate-x-0 opacity-100",
        NotificationStyles?.[notification.type]?.base,
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 flex-shrink-0",
          NotificationStyles?.[notification.type]?.icon,
        )}
      />

      <div className="flex-1 space-y-1">
        {notification.title && (
          <p className="text-sm font-semibold">{notification.title}</p>
        )}
        <p className="text-sm">{notification.message}</p>
        {notification.action && (
          <button
            type="button"
            onClick={notification.action.onClick}
            className="text-sm font-medium underline hover:no-underline"
          >
            {notification.action.label}
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => onClose(notification.id), 300);
        }}
        className="flex-shrink-0 rounded-md p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default NotificationItem;
