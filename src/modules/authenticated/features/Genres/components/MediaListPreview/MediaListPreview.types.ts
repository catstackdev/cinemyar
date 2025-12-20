import type { GenreImageType } from "@/shared/types/config/media/genre/genre-image-sizes.config";
import type { ImageUrls } from "@/shared/types/types";

export interface MediaListPreviewProps extends React.ComponentPropsWithoutRef<"div"> {
  // children?: React.ReactNode;
  className?: string;
  type: GenreImageType;
  currentImages?: ImageUrls | null;
}
