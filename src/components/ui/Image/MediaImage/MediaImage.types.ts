import type { ImageUrls, ImageVariantSize } from "@/shared/types/types";
import type { ImageProps } from "../Image.types";

// export interface MediaImageProps extends ImageProps {
//   imageUrls?: ImageUrls | null;
//   imageUrlsConfig?: ImageResponsiveConfig;
// }

export interface ImageResponsiveConfig {
  // 1. Which CSS classes to apply at each screen size
  imageClasses: {
    sm?: string; // e.g., 'size-16'
    md?: string; // e.g., 'size-24'
    lg?: string; // e.g., 'size-32'
    xl?: string;
  };
  // 2. The Matrix: Which actual image file should the browser download?
  // Screen Size -> Resource Key (sm | md | lg | original)
  mapping: {
    sm: ImageVariantSize;
    md: ImageVariantSize;
    lg: ImageVariantSize;
    xl: ImageVariantSize;
  };
}
export interface MediaImageProps extends Omit<
  ImageProps,
  "imageUrls" | "imageUrlsConfig"
> {
  imageUrls?: ImageUrls | null;
  imageUrlsConfig?: ImageResponsiveConfig;
}
