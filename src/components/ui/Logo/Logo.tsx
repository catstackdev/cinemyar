import React from "react";
import styles from "./Logo.module.css";
import type { LogoProps } from "./Logo.types";
import { cn } from "@/utils/helpers";

const sizeClasses = {
  sm: {
    icon: "w-9 h-9",
    text: "text-base",
    subtitle: "text-[10px]",
    gap: "gap-1.5",
  },
  md: {
    icon: "w-10 h-10",
    text: "text-xl",
    subtitle: "text-xs",
    gap: "gap-2",
  },
  lg: {
    icon: "w-12 h-12",
    text: "text-3xl",
    subtitle: "text-sm",
    gap: "gap-3",
  },
  xl: {
    icon: "w-16 h-16",
    text: "text-4xl",
    subtitle: "text-md",
    gap: "gap-4",
  },
};

const Logo: React.FC<LogoProps> = ({
  variant = "full",
  size = "md",
  className,
  animated = false,
  iconDelay = "0s",
  textDelay = "0.8s",
  subtitleDelay = "1.2s",
  ...rest
}) => {
  const sizeClass = sizeClasses[size];

  const renderIcon = () => (
    <div
      className={cn("relative", animated && styles.iconEntrance)}
      style={
        animated
          ? {
              animationDelay: iconDelay,
            }
          : undefined
      }
    >
      <svg className={sizeClass.icon} viewBox="0 0 24 24" fill="none">
        <rect
          x="4"
          y="2"
          width="16"
          height="20"
          rx="2"
          className={cn(
            "fill-primary transition-all duration-500",
            animated && styles.filmStripPulse,
          )}
          style={animated ? { animationDelay: iconDelay } : undefined}
        />

        <rect
          x="6"
          y="4"
          width="12"
          height="6"
          className="fill-background opacity-20"
        />
        <rect
          x="6"
          y="14"
          width="12"
          height="6"
          className="fill-background opacity-20"
        />

        <g className={animated ? styles.sprocketLeft : ""}>
          {[4, 7, 10, 13, 16, 19].map((y, i) => (
            <rect
              key={`left-${y}`}
              x="4"
              y={y}
              width="1.5"
              height="1.5"
              rx="0.3"
              className="fill-warning"
              style={
                animated
                  ? {
                      animationDelay: `calc(${iconDelay} + ${i * 0.05}s)`,
                    }
                  : undefined
              }
            />
          ))}
        </g>

        <g className={animated ? styles.sprocketRight : ""}>
          {[4, 7, 10, 13, 16, 19].map((y, i) => (
            <rect
              key={`right-${y}`}
              x="18.5"
              y={y}
              width="1.5"
              height="1.5"
              rx="0.3"
              className="fill-warning"
              style={
                animated
                  ? {
                      animationDelay: `calc(${iconDelay} + ${i * 0.05}s)`,
                    }
                  : undefined
              }
            />
          ))}
        </g>

        <circle
          cx="12"
          cy="12"
          r="5"
          className={cn(
            "fill-warning opacity-20",
            animated && styles.spotlight,
          )}
          style={
            animated
              ? { animationDelay: `calc(${iconDelay} + 0.3s)` }
              : undefined
          }
        />
        <circle
          cx="12"
          cy="12"
          r="3.5"
          className={cn(
            "fill-warning opacity-40",
            animated && styles.spotlight,
          )}
          style={
            animated
              ? { animationDelay: `calc(${iconDelay} + 0.4s)` }
              : undefined
          }
        />

        <path
          d="M12 8.5 L12.8 10.8 L15.2 11 L13.4 12.6 L13.9 15 L12 13.8 L10.1 15 L10.6 12.6 L8.8 11 L11.2 10.8 Z"
          className={cn(
            "fill-warning transition-all duration-500",
            animated && styles.starRotate,
          )}
          style={
            animated
              ? { animationDelay: `calc(${iconDelay} + 0.5s)` }
              : undefined
          }
        />
      </svg>
    </div>
  );

  const renderText = () => (
    <div className="flex flex-col items-center">
      <h1
        className={cn(
          sizeClass.text,
          "font-bold text-primary tracking-wider",
          animated && styles.textSlideIn,
        )}
        style={
          animated
            ? {
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
          "text-warning tracking-widest uppercase font-semibold",
          animated && styles.subtitleFadeIn,
        )}
        style={
          animated
            ? {
                animationDelay: subtitleDelay,
              }
            : undefined
        }
      >
        MOVIE
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
      className={cn(styles.root, "flex items-center", sizeClass.gap, className)}
      {...rest}
    >
      {renderIcon()}
      {renderText()}
    </div>
  );
};

export default Logo;
