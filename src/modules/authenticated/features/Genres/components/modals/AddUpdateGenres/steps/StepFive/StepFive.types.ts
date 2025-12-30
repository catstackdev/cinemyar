import type {
  AdminGenreSerialized,
  GenreMediaStatus,
} from "@/shared/types/genre";

export interface StepFiveProps extends React.ComponentPropsWithoutRef<"div"> {
  genreName: string;
  iconStatus?: GenreMediaStatus | null;
  bannerStatus?: GenreMediaStatus | null;
  thumbnailStatus?: GenreMediaStatus | null;
  className?: string;
  newGenre?: AdminGenreSerialized | null;
}
