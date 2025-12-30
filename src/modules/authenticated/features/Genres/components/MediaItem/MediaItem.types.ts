import type { GenreImageType } from "@/shared/constants";
import type { MediaItem } from "@/shared/types/genre";

export interface MediaItemProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
  className?: string;
  item: MediaItem;
  type: GenreImageType;
  entityId: string | null;
  entityType: "genres" | "movies";
}
