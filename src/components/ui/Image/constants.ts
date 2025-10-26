import type { ImageFit, ImageAspectRatio } from "./Image.types";

export const imageFits: Record<ImageFit, string> = {
  cover: "object-cover",
  contain: "object-contain",
  fill: "object-fill",
  none: "object-none",
  "scale-down": "object-scale-down",
};

export const imageAspectRatios: Record<ImageAspectRatio, string> = {
  square: "aspect-square",
  video: "aspect-video",
  auto: "aspect-auto",
};
