import type { ComponentPropsWithoutRef } from "react";

export type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";
export type ImageAspectRatio = "square" | "video" | "auto";
export type ImageLoadingState = "idle" | "loading" | "loaded" | "error";

export interface ImageProps
  extends Omit<
    ComponentPropsWithoutRef<"img">,
    "onLoad" | "onError" | "onProgress"
  > {
  src?: string | null;
  alt: string;
  fallback?: string;
  placeholder?: string;
  fit?: ImageFit;
  aspectRatio?: ImageAspectRatio;
  lazy?: boolean;
  showProgress?: boolean;
  className?: string;
  wrapperClassName?: string;
  onError?: () => void;
  onLoad?: () => void;
  onProgress?: (progress: number) => void;
}
