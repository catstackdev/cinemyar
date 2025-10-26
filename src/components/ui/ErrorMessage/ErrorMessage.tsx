import React from "react";
import type { ErrorMessageProps } from "./ErrorMessage.types";
import { icons, sizeClasses, variantClasses } from "./constants";
import { cn } from "@/utils/helpers/classNames";

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  id,
  size = "sm",
  variant = "error",
  icon = false,
  className,
  ...rest
}) => {
  if (!children) return null;

  const sizeStyle = sizeClasses[size];
  const variantStyle = variantClasses[variant];
  return (
    <p
      id={id}
      className={cn(
        "flex items-center gap-1.5 font-medium",
        sizeStyle,
        variantStyle,
        className,
      )}
      role="alert"
      {...rest}
    >
      {icon && <span aria-hidden="true">{icons[variant]}</span>}
      <span>{children}</span>
    </p>
  );
};

export default ErrorMessage;
