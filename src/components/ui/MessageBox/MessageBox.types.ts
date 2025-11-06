import type { PortalBackgroundProps } from "../PortalBackground/PortalBackground.types";

export interface MessageBoxProps
  extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
  className?: string;

  /** Enable box open/close animations */
  animated?: boolean;

  /** Control box visibility (for close animation) */
  open?: boolean;

  /** Callback when close animation completes */
  onClose?: () => void;

  /** Enable portal background */
  withPortal?: boolean;

  /** Portal background variant */
  portalVariant?: PortalBackgroundProps["variant"];

  /** Portal background intensity */
  portalIntensity?: PortalBackgroundProps["intensity"];

  /** Portal size */
  portalSize?: PortalBackgroundProps["portalSize"];

  /** Portal position */
  portalPosition?: PortalBackgroundProps["portalPosition"];

  /** Enable portal animation */
  portalAnimated?: boolean;

  /** Box variant style */
  variant?: "default" | "danger" | "warning" | "success" | "info";

  /** Full screen mode */
  fullScreen?: boolean;
}
