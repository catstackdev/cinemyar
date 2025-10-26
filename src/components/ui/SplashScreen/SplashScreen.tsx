import React, { useState, useEffect } from "react";
import styles from "./SplashScreen.module.css";
import type { SplashScreenProps } from "./SplashScreen.types";
import { cn } from "@/utils/helpers";

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
        "fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        shouldExit && "animate-splash-exit",
        className,
      )}
      {...rest}
    >
      {/* Animated Background Gradient - 0.3s fade in */}
      <div 
        className="absolute inset-0 animate-bg-fade-in" 
        style={{ 
          background: 'radial-gradient(circle, rgba(127, 29, 29, 0.2) 0%, transparent 70%)',
          opacity: 0
        }}
      />

      {/* Logo Container */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Film Icon - 0.5s delay, 1.5s animation */}
        <div 
          className="relative animate-icon-entrance"
          style={{ 
            opacity: 0,
            animationDelay: '0.5s'
          }}
        >
          <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19.82 2H4.18C2.97 2 2 2.97 2 4.18v15.64C2 21.03 2.97 22 4.18 22h15.64c1.21 0 2.18-.97 2.18-2.18V4.18C22 2.97 21.03 2 19.82 2z"
              fill="#DC2626"
            />
            <path
              d="M7 2l-2 5M12 2l-2 5M17 2l-2 5"
              stroke="#F59E0B"
              strokeWidth="2"
            />
            <rect x="4" y="8" width="16" height="2" fill="#F59E0B" />
          </svg>
        </div>

        {/* Text Container */}
        <div className="text-center">
          {/* CINEMYAR text - 1.5s delay */}
          <h1 
            className="text-5xl font-bold text-white tracking-wider animate-text-fade-in"
            style={{ 
              opacity: 0,
              animationDelay: '1.5s'
            }}
          >
            CINEMYAR
          </h1>
          {/* Movie subtitle - 2.0s delay */}
          <p 
            className="text-amber-500 text-sm mt-2 tracking-wide animate-subtitle-fade-in"
            style={{ 
              opacity: 0,
              animationDelay: '2.0s'
            }}
          >
            Movie
          </p>
        </div>

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
        <p className="text-sm text-gray-300 font-medium tracking-wide">Loading...</p>
        <div className="flex gap-2">
          <div 
            className="h-2.5 w-2.5 rounded-full bg-red-500 animate-bounce" 
            style={{ animationDelay: '0ms' }}
          />
          <div 
            className="h-2.5 w-2.5 rounded-full bg-red-500 animate-bounce" 
            style={{ animationDelay: '150ms' }}
          />
          <div 
            className="h-2.5 w-2.5 rounded-full bg-red-500 animate-bounce" 
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
