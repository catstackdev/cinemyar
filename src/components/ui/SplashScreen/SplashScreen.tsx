import React, { useState, useEffect } from "react";
import styles from "./SplashScreen.module.css";
import type { SplashScreenProps } from "./SplashScreen.types";
import { cn } from "@/utils/helpers";
import Logo from "@/components/ui/Logo";

const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  children,
  className,
  isAppReady = false,
  ...rest
}) => {
  const [shouldExit, setShouldExit] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    // Minimum 3.5 second display time
    const minTimer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 3500);

    return () => {
      clearTimeout(minTimer);
    };
  }, []);

  useEffect(() => {
    // Only exit when both conditions met: min time AND app ready
    if (minTimeElapsed && isAppReady && !shouldExit) {
      setShouldExit(true);
      
      // Call onComplete after fade out animation (500ms)
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }
  }, [minTimeElapsed, isAppReady, shouldExit, onComplete]);

  return (
    <div
      data-testid="splashScreen"
      className={cn(
        styles.root,
        "fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-muted to-background",
        shouldExit && "animate-splash-exit",
        className,
      )}
      {...rest}
    >
      {/* Animated Background Gradient - 0.3s fade in */}
      <div 
        className="absolute inset-0 animate-bg-fade-in bg-primary/5" 
        style={{ 
          background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
          opacity: 0
        }}
      />

      {/* Logo Container */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <Logo 
          variant="full" 
          size="xl" 
          animated={true}
          iconDelay="0.5s"
          textDelay="1.5s"
          subtitleDelay="2.0s"
        />

        {/* Logo settle bounce - 2.5s delay */}
        <div 
          className="animate-logo-settle"
          style={{ 
            animationDelay: '2.5s'
          }}
        />
      </div>

      {/* Loading Indicator - appears at 2.5s */}
      <div 
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        style={{ 
          opacity: 0,
          animation: 'fade-in 0.3s ease-out 2.5s forwards'
        }}
      >
        <p className="text-sm text-muted-foreground font-medium tracking-wide">Loading...</p>
        <div className="flex gap-2">
          <div 
            className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce" 
            style={{ animationDelay: '0ms' }}
          />
          <div 
            className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce" 
            style={{ animationDelay: '150ms' }}
          />
          <div 
            className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce" 
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
