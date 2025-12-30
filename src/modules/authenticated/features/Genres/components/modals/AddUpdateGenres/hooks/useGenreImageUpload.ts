import { useState } from "react";
import type { GenreMediaStatus } from "@/shared/types/genre";
import type { ApiResponse } from "@/shared/types";
import type { GenreMediaItem } from "@/shared/types/genre";
import { useUploadMedia } from "@/modules/domain/media/hooks/useMedia";
import type { GenreImageType } from "@/shared/constants";

export interface UseGenreImageUploadProps {
  genreId?: string | null;
  imageType: GenreImageType;
  onSuccess?: (data: GenreMediaItem) => void;
  onError?: (error: any) => void;
}

export const useGenreImageUpload = ({
  genreId,
  imageType,
  onSuccess,
  onError,
}: UseGenreImageUploadProps) => {
  const [uploadStatus, setUploadStatus] = useState<GenreMediaStatus | null>(
    null,
  );

  const { mutate: uploadMedia, isPending, uploadProgress } = useUploadMedia();

  const handleFileDrop = (file: File) => {
    if (!genreId) {
      return;
    }

    setUploadStatus("PROCESSING");
    uploadMedia(
      {
        entityId: genreId,
        entityType: "genres",
        mediaType: "images",
        subType: imageType,
        file,
      },
      {
        onSuccess: (response: ApiResponse<GenreMediaItem>) => {
          setUploadStatus(response.data.status);
          onSuccess?.(response.data);
        },
        onError: (error: any) => {
          setUploadStatus("FAILED");
          onError?.(error);
        },
      },
    );
  };

  const reset = () => {
    setUploadStatus(null);
  };

  return {
    uploadStatus,
    isPending,
    uploadProgress,
    handleFileDrop,
    reset,
    canUpload: !!genreId && !isPending,
  };
};
