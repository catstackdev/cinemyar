import type { Color } from "@/types/colors";
import type { Size } from "@/types/size";
import type { ReactNode } from "react";

export type LoadingType =
  | "spinner"
  | "dots"
  | "pulse"
  | "bars"
  | "skeleton-text"
  | "skeleton-circular"
  | "skeleton-rect";

export type LoadingSize = Size;
export type LoadingColor = Color;
export type LoadingSpeed = "slow" | "normal" | "fast";
export type LoadingSkeletonVariant = "default" | "muted" | "subtle";

export interface LoadingProps {
  children?: ReactNode;
  type?: LoadingType;
  size?: LoadingSize;
  className?: string;
  containerClassName?: string;
  inheritColor?: boolean;
  text?: string;
  fullscreen?: boolean;
  inline?: boolean;
  count?: number;
  color?: LoadingColor;
  speed?: LoadingSpeed;
  skeletonVariant?: LoadingSkeletonVariant;
  textWidths?: string[];
  zIndex?: number;
  label?: string;
}
