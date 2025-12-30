import type { ReactNode } from "react";
import type {
  GenreMediaType,
  GenreMediaStatus,
  MediaItem,
  ImageUrls,
} from "@/shared/types/genre";

export interface GenreImageUploadProps {
  items?: MediaItem[];
  imageType: GenreMediaType;
  title: string;
  description?: string;
  icon?: ReactNode;
  isPending?: boolean;
  uploadProgress?: number;
  uploadStatus?: GenreMediaStatus | null;
  currentImages?: ImageUrls | null;
  onFileDrop?: (file: File) => void;
  className?: string;
  maxSize?: number;
  genreId: string | null;
  activeVersion: number | null;
}
