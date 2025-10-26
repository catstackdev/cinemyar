import type { BadgeProps } from "./Badge.types";
import { cn } from "@/utils/helpers/classNames";
import { variantClasses, sizeClasses } from "./constants";

const Badge = ({
  children,
  variant = "default",
  size = "md",
  className,
  ...rest
}: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Badge;
