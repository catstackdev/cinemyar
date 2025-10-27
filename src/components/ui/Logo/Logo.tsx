import React from "react";
import styles from "./Logo.module.css";
import type { LogoProps } from "./Logo.types";
import { cn } from "@/utils/helpers";

const sizeClasses = {
  sm: {
    icon: "w-6 h-6",
    text: "text-base",
    subtitle: "text-[8px]",
    gap: "gap-1.5",
  },
  md: {
    icon: "w-8 h-8",
    text: "text-xl",
    subtitle: "text-[10px]",
    gap: "gap-2",
  },
  lg: {
    icon: "w-12 h-12",
    text: "text-3xl",
    subtitle: "text-xs",
    gap: "gap-3",
  },
  xl: {
    icon: "w-16 h-16",
    text: "text-4xl",
    subtitle: "text-sm",
    gap: "gap-4",
  },
};

const Logo: React.FC<LogoProps> = ({
  variant = "full",
  size = "md",
  className,
  animated = false,
  iconDelay = "0.5s",
  textDelay = "1.5s",
  subtitleDelay = "2.0s",
  ...rest
}) => {
  const sizeClass = sizeClasses[size];

  const renderIcon = () => (
    <div
      className={cn(animated && "animate-icon-entrance")}
      style={
        animated
          ? {
              opacity: 0,
              animationDelay: iconDelay,
            }
          : undefined
      }
    >
      <svg className={sizeClass.icon} viewBox="0 0 24 24" fill="none">
        <path
          d="M19.82 2H4.18C2.97 2 2 2.97 2 4.18v15.64C2 21.03 2.97 22 4.18 22h15.64c1.21 0 2.18-.97 2.18-2.18V4.18C22 2.97 21.03 2 19.82 2z"
          className="fill-primary"
        />
        <path
          d="M7 2l-2 5M12 2l-2 5M17 2l-2 5"
          className="stroke-warning"
          strokeWidth="2"
        />
        <rect x="4" y="8" width="16" height="2" className="fill-warning" />
      </svg>
    </div>
  );

  const renderText = () => (
    <div className="text-center">
      <h1
        className={cn(
          sizeClass.text,
          "font-bold text-foreground tracking-wider",
          animated && "animate-text-fade-in",
        )}
        style={
          animated
            ? {
                opacity: 0,
                animationDelay: textDelay,
              }
            : undefined
        }
      >
        CINEMYAR
      </h1>
      <p
        className={cn(
          sizeClass.subtitle,
          "text-primary tracking-wide uppercase",
          animated && "animate-subtitle-fade-in",
        )}
        style={
          animated
            ? {
                opacity: 0,
                animationDelay: subtitleDelay,
              }
            : undefined
        }
      >
        Movie
      </p>
    </div>
  );

  if (variant === "icon") {
    return (
      <div className={cn(styles.root, className)} {...rest}>
        {renderIcon()}
      </div>
    );
  }

  if (variant === "text") {
    return (
      <div className={cn(styles.root, className)} {...rest}>
        {renderText()}
      </div>
    );
  }

  return (
    <div
      className={cn(
        styles.root,
        "flex items-center",
        sizeClass.gap,
        className,
      )}
      {...rest}
    >
      {renderIcon()}
      {renderText()}
    </div>
  );
};

export default Logo;
