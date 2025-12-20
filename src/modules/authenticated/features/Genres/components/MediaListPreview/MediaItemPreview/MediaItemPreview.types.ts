import type { GenreImageType } from "@/shared/types/config/media/genre/genre-image-sizes.config";

export interface MediaItemPreviewProps extends React.ComponentPropsWithoutRef<"div"> {
  // children?: React.ReactNode;
  className?: string;
  label: string;
  src?: string;
  dimensions: string;
  type: GenreImageType;
}
