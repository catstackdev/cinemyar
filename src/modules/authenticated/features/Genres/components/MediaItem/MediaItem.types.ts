import { type GenreImageType } from "@/shared/types/config/media/genre/genre-image-sizes.config";
import type { MediaItem } from "@/shared/types/types/genre";

export interface MediaItemProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
  className?: string;
  item: MediaItem;
  type: GenreImageType;
  entityId: string | null;
  entityType: "genres" | "movies";
}
