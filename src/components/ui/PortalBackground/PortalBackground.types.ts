export interface PortalBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "mystic" | "cosmic" | "fire" | "ice";
  intensity?: "low" | "medium" | "high";
  animated?: boolean;
  portalPosition?: "left" | "center" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  portalSize?: "sm" | "md" | "lg" | "xl";
}
