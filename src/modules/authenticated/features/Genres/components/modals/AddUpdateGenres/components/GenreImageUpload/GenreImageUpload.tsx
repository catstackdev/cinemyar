import React, { useState } from "react";
import { cn } from "@/utils/helpers/classNames";
import type { GenreImageUploadProps } from "./GenreImageUpload.types";
import { Dropzone, Progress, Badge, EmptyState } from "@/components/ui";
import { CheckCircle, Upload, XCircle, Loader2 } from "lucide-react";
import MediaItem from "../../../../MediaItem";
import MediaListPreview from "../../../../MediaListPreview";
import { useScrollTo } from "@/hooks";

const GenreImageUpload: React.FC<GenreImageUploadProps> = ({
  imageType,
  title,
  description,
  icon,
  isPending,
  uploadProgress,
  uploadStatus,
  currentImages,
  onFileDrop,
  className,
  maxSize = 5 * 1024 * 1024, // 5MB default
  items,
  genreId,
  activeVersion,
}) => {
  const { scrollToElement } = useScrollTo();
  const [error, setError] = useState<string>("");

  const handleDrop = (acceptedFiles: File[], rejectedFiles: File[]) => {
    if (rejectedFiles.length > 0) {
      setError("File was rejected. Please check file type and size.");
      return;
    }
    if (acceptedFiles?.length > 0) {
      const file = acceptedFiles[0];
      if (!file) return;
      setError("");
      onFileDrop?.(file);
    }
  };

  const handleHeaderClick = () => {
    if (activeVersion) {
      scrollToElement(`media-item-v${activeVersion}`);
    }
  };
  // Determine upload status display
  const getStatusBadge = () => {
    if (isPending) {
      return (
        <Badge variant="warning" className="gap-2">
          <Loader2 className="w-3 h-3 animate-spin" />
          Uploading...
        </Badge>
      );
    }

    if (uploadStatus === "READY" || uploadStatus === "ACTIVE") {
      return (
        <Badge variant="success" className="gap-2">
          <CheckCircle className="w-3 h-3" />
          Uploaded
        </Badge>
      );
    }

    if (uploadStatus === "FAILED") {
      return (
        <Badge variant="error" className="gap-2">
          <XCircle className="w-3 h-3" />
          Failed
        </Badge>
      );
    }

    if (uploadStatus === "PROCESSING") {
      return (
        <Badge variant="info" className="gap-2">
          <Loader2 className="w-3 h-3 animate-spin" />
          Processing...
        </Badge>
      );
    }

    return null;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {getStatusBadge()}
      </div>
      {/* Current Image Preview (if exists) */}
      <div className="p-4 bg-muted/30 rounded-lg border border-border">
        <div
          className={cn(
            "cursor-pointer",
            activeVersion &&
              "group hover:text-primary transition-colors duration-200",
          )}
          onClick={handleHeaderClick}
        >
          <p
            className={cn(
              "text-sm text-muted-foreground mb-2",
              activeVersion &&
                "group-hover:text-primary transition-colors duration-200",
            )}
          >
            Current {imageType}
            {!!activeVersion && <span> (Version: v{activeVersion})</span>}
          </p>
          {/* ... MediaListPreview ... */}
        </div>

        {!!currentImages && (
          <MediaListPreview type={imageType} currentImages={currentImages} />
        )}
        {!currentImages && (
          <EmptyState title="No Image" description="no Published Images" />
        )}
      </div>
      {/* media item */}
      {items && items?.length > 0 && (
        <div className="grid grid-cols-1 gap-2">
          {items.map((item) => {
            return (
              <div key={item.version} id={`media-item-v${item.version}`}>
                <MediaItem
                  item={item}
                  type={imageType}
                  entityId={genreId ?? null}
                  entityType="genres"
                />
              </div>
            );
          })}
        </div>
      )}
      {/* Dropzone */}
      {isPending && !!uploadProgress && uploadProgress > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Uploading...</span>
            <span className="font-medium text-foreground">
              {uploadProgress}%
            </span>
          </div>
          <Progress
            value={uploadProgress ?? 0}
            max={100}
            variant="success"
            size="md"
          />
        </div>
      )}
      <Dropzone
        label={`Upload ${imageType}`}
        description={`Max size: ${(maxSize / (1024 * 1024)).toFixed(0)}MB. Supported: PNG, JPG, WEBP`}
        variant="dashed"
        size="sm"
        maxFiles={1}
        accept={{
          "image/*": [".png", ".jpg", ".jpeg", ".webp"],
        }}
        maxSize={maxSize}
        onDrop={handleDrop}
        disabled={isPending}
        error={error}
        icon={icon || <Upload className="w-12 h-12 text-muted-foreground" />}
      />
      {error && (
        <div className="p-3 bg-danger/10 border border-danger/30 rounded-lg">
          <p className="text-sm text-danger flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            {error}
          </p>
        </div>
      )}
    </div>
  );
};

export default GenreImageUpload;
