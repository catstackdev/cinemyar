import type { GenreImageType } from "@/shared/constants";
import type { ImageUrls } from "@/shared/types";

export interface MediaListPreviewProps extends React.ComponentPropsWithoutRef<"div"> {
  // children?: React.ReactNode;
  className?: string;
  type: GenreImageType;
  currentImages?: ImageUrls | null;
}
