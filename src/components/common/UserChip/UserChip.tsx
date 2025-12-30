import React from "react";
import { cn } from "@/utils/helpers/classNames";
import type { UserChipProps } from "./UserChip.types";
import { Badge } from "@/components/ui";
import { User } from "lucide-react";

const UserChip: React.FC<UserChipProps> = ({
  user,
  size = "md",
  showAvatar = false,
  showRole = false,
  showEmail = false,
  clickable = false,
  onUserClick,
  className,
}) => {
  if (!user) {
    return <span className="text-muted-foreground text-sm">—</span>;
  }

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const handleClick = () => {
    if (clickable && onUserClick) {
      onUserClick(user.id);
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2",
        clickable && "cursor-pointer hover:text-primary transition-colors",
        sizeClasses[size],
        className,
      )}
      onClick={handleClick}
    >
      {showAvatar && (
        <div className="flex-shrink-0">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className={cn(
                "rounded-full object-cover",
                size === "sm" && "w-5 h-5",
                size === "md" && "w-6 h-6",
                size === "lg" && "w-8 h-8",
              )}
            />
          ) : (
            <div
              className={cn(
                "rounded-full bg-primary/10 flex items-center justify-center",
                size === "sm" && "w-5 h-5",
                size === "md" && "w-6 h-6",
                size === "lg" && "w-8 h-8",
              )}
            >
              <User
                className={cn(
                  "text-primary",
                  size === "sm" && "w-3 h-3",
                  size === "md" && "w-4 h-4",
                  size === "lg" && "w-5 h-5",
                )}
              />
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col min-w-0">
        <span className="font-medium truncate">{user.username}</span>
        {showEmail && user.email && (
          <span className="text-muted-foreground text-xs truncate">
            {user.email}
          </span>
        )}
      </div>

      {showRole && user.role && (
        <Badge variant="secondary" size="sm">
          {user.role}
        </Badge>
      )}
    </div>
  );
};

export default UserChip;
