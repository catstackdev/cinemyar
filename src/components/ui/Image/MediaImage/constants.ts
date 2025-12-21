import type { ImageResponsiveConfig } from "./MediaImage.types";

export const getResponsiveImageData = (
  urls: Record<string, string | null> | undefined,
  config: ImageResponsiveConfig,
) => {
  if (!urls) return null;

  // We define the breakpoints for the <source> tags
  // Using 'min-width' (Mobile First)
  return [
    { media: "(min-width: 1280px)", src: urls[config.mapping.xl] }, // XL Screen
    { media: "(min-width: 1024px)", src: urls[config.mapping.lg] }, // LG Screen
    { media: "(min-width: 768px)", src: urls[config.mapping.md] }, // MD Screen
    { media: "(max-width: 767px)", src: urls[config.mapping.sm] }, // SM Screen
  ].filter((item) => !!item.src); // Only include if URL exists
};
