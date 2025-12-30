import React from "react";
import { cn } from "@/utils/helpers/classNames";
import styles from "./MediaListPreview.module.css";
import type { MediaListPreviewProps } from "./MediaListPreview.types";
import { GenreImageSizes } from "@/shared/config/media/genre/genre-image-sizes.config";
import GenreImg from "../GenreImg";

const MediaListPreview: React.FC<MediaListPreviewProps> = ({
  type,
  currentImages,
  children,
  className,
  ...rest
}) => {
  const getDim = (s: { width: number | null; height: number | null }) =>
    s.width ? `${s.width}x${s.height}` : "Original";

  // Convert type to lowercase to match GenreImageSizes keys (e.g., "ICON" -> "icon")
  const normalizedType = type.toLowerCase() as 'icon' | 'banner' | 'thumbnail';
  const sizeConfig = GenreImageSizes[normalizedType] ?? null;

  const previewSizes = [
    { key: "original", label: "Original" },
    { key: "lg", label: "Large (LG)" },
    { key: "md", label: "Medium (MD)" },
    { key: "sm", label: "Small (SM)" },
  ] as const;

  return (
    <div className={cn(styles.root, className)} {...rest}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {previewSizes.map(({ key, label }) => (
          <div key={key} className="space-y-1">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {label}
              </span>
              <span className="text-[10px] text-muted-foreground/60">
                {/* @ts-ignore - access config by key */}
                {getDim(sizeConfig[key])}
              </span>
            </div>

            <GenreImg
              imageUrls={currentImages}
              size={key} // Passes 'sm', 'md', etc.
              aspectRatio={normalizedType === "icon" ? "square" : "auto"}
              alt={`${type} image (${key})`}
              // Ensure preview images don't download everything
            />
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default MediaListPreview;
