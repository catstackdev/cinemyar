import React, { useState, useEffect } from "react";
import { cn } from "@/utils/helpers/classNames";
import type { MessageBoxProps } from "./MessageBox.types";
import { PortalBackground } from "../PortalBackground";

const MessageBox: React.FC<MessageBoxProps> = ({
  children,
  className,
  animated = true,
  open = true,
  onClose,
  withPortal = false,
  portalVariant = "cosmic",
  portalIntensity = "medium",
  portalSize = "lg",
  portalPosition = "center",
  portalAnimated = true,
  variant = "default",
  fullScreen = false,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(!animated);
  const [isClosing, setIsClosing] = useState(false);

  // Trigger open animation on mount
  useEffect(() => {
    if (animated && open) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => {
        clearTimeout(timer);
      };
    }
    return undefined;
  }, [animated, open]);

  // Handle close animation
  useEffect(() => {
    if (animated && !open && isVisible) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        onClose?.();
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
    return undefined;
  }, [animated, open, isVisible, onClose]);

  // Variant styles
  const variantStyles = {
    default: "border-primary ring-primary/30",
    danger: "border-danger ring-danger/30",
    warning: "border-warning ring-warning/30",
    success: "border-success ring-success/30",
    info: "border-info ring-info/30",
  };

  const variantShadows = {
    default: "shadow-primary/40",
    danger: "shadow-danger/40",
    warning: "shadow-warning/40",
    success: "shadow-success/40",
    info: "shadow-info/40",
  };

  const boxContent = (
    <div
      className={cn(
        "backdrop-blur-sm border ring-2 rounded-xl shadow-lg p-8",
        variantStyles[variant],
        variantShadows[variant],
        "transition-all duration-300",
        animated && isVisible && !isClosing && "animate-box-open",
        animated && isClosing && "animate-box-close",
        className,
      )}
      style={{
        transformStyle: "preserve-3d",
      }}
      {...rest}
    >
      {children}
    </div>
  );

  const content = (
    <div
      className={cn(
        "flex items-center justify-center",
        fullScreen && "min-h-screen",
      )}
    >
      <div className="max-w-md w-full mx-4">{boxContent}</div>
    </div>
  );

  if (withPortal) {
    return (
      <PortalBackground
        variant={portalVariant}
        intensity={portalIntensity}
        portalSize={portalSize}
        portalPosition={portalPosition}
        animated={portalAnimated}
      >
        {content}
      </PortalBackground>
    );
  }

  return content;
};

export default MessageBox;
