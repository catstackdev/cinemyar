import React from "react";
import { cn } from "@/utils/helpers/classNames";
import styles from "./MediaListPreview.module.css";
import type { MediaListPreviewProps } from "./MediaListPreview.types";
import MediaItemPreview from "./MediaItemPreview";
import { GenreImageSizes } from "@/shared/types/config/media/genre/genre-image-sizes.config";

const MediaListPreview: React.FC<MediaListPreviewProps> = ({
  type,
  currentImages,
  children,
  className,
  ...rest
}) => {
  const getDim = (s: { width: number | null; height: number | null }) =>
    s.width ? `${s.width}x${s.height}` : "Original";

  const sizeConfig = GenreImageSizes[type] ?? null;

  return (
    <div className={cn(styles.root, className)} {...rest}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MediaItemPreview
          type={type}
          label="Original"
          src={currentImages?.original}
          dimensions={getDim(sizeConfig.original)}
        />
        <MediaItemPreview
          type={type}
          label="Small (SM)"
          src={currentImages?.sm}
          dimensions={getDim(sizeConfig.sm)}
        />
        <MediaItemPreview
          type={type}
          label="Medium (MD)"
          src={currentImages?.md}
          dimensions={getDim(sizeConfig.md)}
        />
        <MediaItemPreview
          type={type}
          label="Large (LG)"
          src={currentImages?.lg}
          dimensions={getDim(sizeConfig.lg)}
        />
      </div>
      {children}
    </div>
  );
};

export default MediaListPreview;
