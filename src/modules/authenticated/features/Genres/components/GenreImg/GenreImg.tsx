import React, { useMemo } from "react";
import { cn } from "@/utils/helpers/classNames";
import type { GenreImgProps } from "./GenreImg.types";
import { Badge } from "@/components/ui";
import { Eye } from "lucide-react";
import { MediaImage } from "@/components/ui/Image";
import type { ImageResponsiveConfig } from "@/components/ui/Image/MediaImage/MediaImage.types";

const GenreImg: React.FC<GenreImgProps> = ({
  imageUrls,
  size = "auto",
  alt = "Genre image",
  className,
  showSize = true,
  aspectRatio = "auto",
  showProgress = true,
}) => {
  // Build responsive config based on size prop
  const imageConfig = useMemo((): ImageResponsiveConfig | undefined => {
    if (!imageUrls) return undefined;

    if (size === "auto") {
      // Auto: responsive across breakpoints
      return {
        imageClasses: {
          sm: "w-full h-full",
          md: "w-full h-full",
          lg: "w-full h-full",
          xl: "w-full h-full",
        },
        mapping: {
          sm: "sm",
          md: "md",
          lg: "lg",
          xl: "lg",
        },
      };
    }

    // Fixed size: use same variant across all breakpoints
    return {
      imageClasses: {
        sm: "w-full h-full",
        md: "w-full h-full",
        lg: "w-full h-full",
        xl: "w-full h-full",
      },
      mapping: {
        sm: size,
        md: size,
        lg: size,
        xl: size,
      },
    };
  }, [imageUrls, size]);

  // Get size label for badge
  const getSizeLabel = (): string => {
    if (!imageUrls) return "N/A";

    if (size === "auto") {
      if (imageUrls.lg) return "LG";
      if (imageUrls.md) return "MD";
      if (imageUrls.sm) return "SM";
      return "Original";
    }
    return size.toUpperCase();
  };

  // Check if we have any valid image
  const hasValidImage = useMemo(() => {
    if (!imageUrls) return false;
    return !!(
      imageUrls.sm ||
      imageUrls.md ||
      imageUrls.lg ||
      imageUrls.original
    );
  }, [imageUrls]);

  // Fallback element for no image
  const fallbackElement = (
    <div
      className={cn(
        "relative bg-muted/30 border border-border rounded-lg flex items-center justify-center",
        aspectRatio === "square" && "aspect-square",
        aspectRatio === "video" && "aspect-video",
        aspectRatio === "wide" && "aspect-[21/9]",
        aspectRatio === "auto" && "aspect-auto",
        className,
      )}
    >
      <p className="text-sm text-muted-foreground">
        {imageUrls ? "Image not available" : "No image"}
      </p>
    </div>
  );

  if (!hasValidImage) {
    return fallbackElement;
  }

  return (
    <div
      className={cn(
        "relative group overflow-hidden rounded-lg border border-border",
        aspectRatio === "square" && "aspect-square",
        aspectRatio === "video" && "aspect-video",
        aspectRatio === "wide" && "aspect-[21/9]",
        aspectRatio === "auto" && "aspect-auto",
        className,
      )}
    >
      <MediaImage
        imageUrls={imageUrls}
        imageUrlsConfig={imageConfig}
        alt={alt}
        fit="cover"
        aspectRatio={aspectRatio}
        showProgress={showProgress}
        fallbackElement={fallbackElement}
        className="transition-transform duration-300 group-hover:scale-105"
      />

      {/* Size Badge */}
      {showSize && (
        <Badge
          variant="secondary"
          size="sm"
          className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm z-20"
        >
          {getSizeLabel()}
        </Badge>
      )}

      {/* View Overlay on Hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
        <div className="flex items-center gap-2 text-white">
          <Eye className="w-5 h-5" />
          <span className="text-sm font-medium">View</span>
        </div>
      </div>
    </div>
  );
};

export default GenreImg;
