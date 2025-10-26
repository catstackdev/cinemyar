import type { ComponentPropsWithoutRef } from "react";

export type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";
export type ImageAspectRatio = "square" | "video" | "auto";

export interface ImageProps extends ComponentPropsWithoutRef<"img"> {
  src: string;
  alt: string;
  fallback?: string;
  fit?: ImageFit;
  aspectRatio?: ImageAspectRatio;
  lazy?: boolean;
  className?: string;
  onError?: () => void;
}
