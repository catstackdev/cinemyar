import { useMemo } from "react";
import { useBreakpoint } from "@/hooks/useMediaQuery";
import type { ImageUrls } from "@/shared/types/types/genre";

interface UseResponsiveImageProps {
  imageUrls?: ImageUrls | null;
  imageType?: GenreImageType;
  autoSelect?: boolean;
  sizes?: string;
}
interface UseResponsiveImageReturn {
  src: string | null; // Primary src for <img>
  srcSet: string | null; // Generated srcset
  sizes: string | null; // Sizes attribute
  selectedSize: "sm" | "md" | "lg" | "original";
}
export function useResponsiveImage(
  props: UseResponsiveImageProps,
): UseResponsiveImageReturn {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  return useMemo(() => {
    if (!props.imageUrls) {
      return { src: null, srcSet: null, sizes: null, selectedSize: "original" };
    }

    // Auto-select size based on viewport
    let selectedSize: "sm" | "md" | "lg" | "original" = "lg";

    if (props.autoSelect) {
      if (isMobile) selectedSize = "sm";
      else if (isTablet) selectedSize = "md";
      else selectedSize = "lg";
    }

    // Get primary src (with fallback chain)
    const src =
      props.imageUrls[selectedSize] ??
      props.imageUrls.lg ??
      props.imageUrls.md ??
      props.imageUrls.sm ??
      props.imageUrls.original ??
      null;

    // Generate srcset for <picture> element
    const srcSetEntries = [];
    if (props.imageUrls.sm) srcSetEntries.push(`${props.imageUrls.sm} 640w`);
    if (props.imageUrls.md) srcSetEntries.push(`${props.imageUrls.md} 1024w`);
    if (props.imageUrls.lg) srcSetEntries.push(`${props.imageUrls.lg} 1920w`);
    if (props.imageUrls.original)
      srcSetEntries.push(`${props.imageUrls.original} 2560w`);

    const srcSet = srcSetEntries.length > 0 ? srcSetEntries.join(", ") : null;

    // Generate sizes attribute (if not provided)
    const sizes = props.sizes ?? generateSizesAttribute(props.imageType);

    return { src, srcSet, sizes, selectedSize };
  }, [
    props.imageUrls,
    props.imageType,
    props.autoSelect,
    props.sizes,
    isMobile,
    isTablet,
    isDesktop,
  ]);
}
