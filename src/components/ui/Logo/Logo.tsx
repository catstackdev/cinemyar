import React from "react";
import styles from "./Logo.module.css";
import type { LogoProps } from "./Logo.types";
import { cn } from "@/utils/helpers";

const Logo: React.FC<LogoProps> = ({ children, className, ...rest }) => {
  return (
    <div
      className={cn(styles.root, "flex flex-col items-center gap-4", className)}
      {...rest}
    >
      {/* Film Clapperboard Icon */}
      <div className="relative">
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

      {/* App Name */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white tracking-wider">
          CINEMYAR
        </h1>
        <p className="text-amber-500 text-sm mt-2 tracking-wide">Movie</p>
      </div>
    </div>
  );
};

export default Logo;
