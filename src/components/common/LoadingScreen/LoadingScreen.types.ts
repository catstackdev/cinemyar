export interface LoadingScreenProps {
  /** Loading message text */
  message?: string;
  
  /** Enable full screen mode */
  fullScreen?: boolean;
  
  /** Enable overlay mode (deprecated - use withPortal instead) */
  overlay?: boolean;
  
  /** Spinner size */
  size?: "sm" | "md" | "lg";
  
  /** Enable portal background */
  withPortal?: boolean;
  
  /** Portal variant */
  portalVariant?: "mystic" | "cosmic" | "fire" | "ice";
  
  /** Enable animations */
  animated?: boolean;
}
