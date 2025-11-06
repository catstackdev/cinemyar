import React from "react";
import type { PortalBackgroundProps } from "./PortalBackground.types";
import { cn } from "@/utils/helpers/classNames";
import styles from "./PortalBackground.module.css";

const PortalBackground: React.FC<PortalBackgroundProps> = ({
  children,
  className,
  variant = "mystic",
  intensity = "medium",
  animated = true,
  portalPosition = "center",
  portalSize = "md",
}) => {
  return (
    <div
      className={cn(
        styles.portalContainer,
        styles[variant],
        styles[intensity],
        animated && styles.animated,
        className
      )}
    >
      {/* Portal Gateway - The window to another dimension */}
      <div 
        className={cn(
          styles.portalGateway,
          styles[`position-${portalPosition}`],
          styles[`size-${portalSize}`]
        )}
      >
        {/* Dimensional View - Shows another world/background */}
        <div className={styles.dimensionalView}>
          <div className={styles.otherDimension}>
            {/* Floating particles in the other dimension */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={styles.dimensionalParticle}
                style={{
                  "--particle-delay": `${i * 0.8}s`,
                  "--particle-x": `${20 + Math.random() * 60}%`,
                  "--particle-y": `${20 + Math.random() * 60}%`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>

        {/* Rotating Geometric Mandala Rings */}
        <div className={styles.mandalaRings}>
          {/* Outer Ring 1 - Large geometric spokes */}
          <svg className={cn(styles.mandala, styles.mandala1)} viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="195" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
            {[...Array(12)].map((_, i) => (
              <g key={i} transform={`rotate(${i * 30} 200 200)`}>
                <line x1="200" y1="5" x2="200" y2="35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <circle cx="200" cy="20" r="5" fill="currentColor" opacity="0.8" />
                <path d="M 190,45 L 200,25 L 210,45 Z" fill="currentColor" opacity="0.7" />
                <line x1="195" y1="55" x2="205" y2="55" stroke="currentColor" strokeWidth="2" />
              </g>
            ))}
          </svg>

          {/* Outer Ring 2 - Detailed segments */}
          <svg className={cn(styles.mandala, styles.mandala2)} viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="175" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6" />
            {[...Array(24)].map((_, i) => (
              <g key={i} transform={`rotate(${i * 15} 200 200)`}>
                <line x1="200" y1="25" x2="200" y2="35" stroke="currentColor" strokeWidth="2" />
              </g>
            ))}
            {[...Array(8)].map((_, i) => (
              <g key={i} transform={`rotate(${i * 45 + 22.5} 200 200)`}>
                <polygon points="200,40 195,50 205,50" fill="currentColor" opacity="0.6" />
              </g>
            ))}
          </svg>

          {/* Middle Ring - Complex patterns */}
          <svg className={cn(styles.mandala, styles.mandala3)} viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="155" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
            {[...Array(8)].map((_, i) => (
              <g key={i} transform={`rotate(${i * 45} 200 200)`}>
                <rect x="195" y="45" width="10" height="35" fill="currentColor" opacity="0.6" rx="2" />
                <circle cx="200" cy="62" r="3" fill="currentColor" />
                <polygon points="200,85 195,95 205,95" fill="currentColor" opacity="0.8" />
                <line x1="200" y1="100" x2="200" y2="110" stroke="currentColor" strokeWidth="2" />
              </g>
            ))}
          </svg>

          {/* Inner Ring 1 - Geometric shapes */}
          <svg className={cn(styles.mandala, styles.mandala4)} viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="130" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.65" />
            {[...Array(16)].map((_, i) => (
              <g key={i} transform={`rotate(${i * 22.5} 200 200)`}>
                <line x1="200" y1="70" x2="200" y2="80" stroke="currentColor" strokeWidth="3" />
              </g>
            ))}
            {[...Array(4)].map((_, i) => (
              <g key={i} transform={`rotate(${i * 90} 200 200)`}>
                <rect x="197" y="85" width="6" height="15" fill="currentColor" opacity="0.7" />
              </g>
            ))}
          </svg>

          {/* Inner Ring 2 - Dense patterns */}
          <svg className={cn(styles.mandala, styles.mandala5)} viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="110" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.75" />
            {[...Array(12)].map((_, i) => (
              <g key={i} transform={`rotate(${i * 30} 200 200)`}>
                <polygon points="200,90 196,100 204,100" fill="currentColor" opacity="0.7" />
                <circle cx="200" cy="105" r="2" fill="currentColor" />
              </g>
            ))}
          </svg>

          {/* Core Ring - Center frame with details */}
          <svg className={cn(styles.mandala, styles.mandala6)} viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="95" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.85" />
            {[...Array(6)].map((_, i) => (
              <g key={i} transform={`rotate(${i * 60} 200 200)`}>
                <path d="M 200,105 L 206,118 L 200,116 L 194,118 Z" fill="currentColor" opacity="0.8" />
                <line x1="200" y1="120" x2="200" y2="130" stroke="currentColor" strokeWidth="2" />
              </g>
            ))}
            <circle cx="200" cy="200" r="88" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>

        {/* Electric Crackling Sparks around edge */}
        <div className={styles.sparkContainer}>
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className={styles.spark}
              style={{
                "--spark-angle": `${i * 9}deg`,
                "--spark-delay": `${Math.random() * 2}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Edge glow effect */}
        <div className={styles.edgeGlow} />
      </div>

      {/* Content Layer - Appears in front */}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default PortalBackground;
