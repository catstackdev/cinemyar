import type { ImageAspectRatio } from "@/components/ui";
import type { ImageUrls } from "@/shared/types/genre";

export type GenreImgSize = "sm" | "md" | "lg" | "original" | "auto";

export interface GenreImgProps {
  imageUrls?: ImageUrls | null;
  size?: GenreImgSize;
  alt?: string;
  className?: string;
  showSize?: boolean;
  aspectRatio?: ImageAspectRatio;
  showProgress?: boolean;
}
