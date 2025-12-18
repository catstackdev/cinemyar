import React from "react";
import { CheckCircle2, Clock, Loader2, XCircle } from "lucide-react";
import Progress from "@/components/ui/Progress";
import { Card } from "@/components/ui";
import { cn } from "@/utils/helpers/classNames";

export type EncodingStatus = "pending" | "uploading" | "encoding" | "completed" | "failed";

export interface ThumbnailSize {
  name: string;
  size: string;
  progress: number;
  status: EncodingStatus;
}

export interface VideoQuality {
  name: string;
  resolution: string;
  progress: number;
  status: EncodingStatus;
  bitrate?: string;
}

interface EncodingProgressProps {
  type: "image" | "video";
  uploadProgress: number;
  thumbnails?: ThumbnailSize[];
  qualities?: VideoQuality[];
  className?: string;
}

const StatusIcon: React.FC<{ status: EncodingStatus }> = ({ status }) => {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4 text-muted-foreground" />;
    case "uploading":
    case "encoding":
      return <Loader2 className="h-4 w-4 text-primary animate-spin" />;
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-success" />;
    case "failed":
      return <XCircle className="h-4 w-4 text-danger" />;
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />;
  }
};

const StatusBadge: React.FC<{ status: EncodingStatus }> = ({ status }) => {
  const styles = {
    pending: "bg-secondary/50 text-muted-foreground",
    uploading: "bg-info/10 text-info",
    encoding: "bg-primary/10 text-primary",
    completed: "bg-success/10 text-success",
    failed: "bg-danger/10 text-danger",
  };

  const labels = {
    pending: "Pending",
    uploading: "Uploading",
    encoding: "Encoding",
    completed: "Completed",
    failed: "Failed",
  };

  return (
    <span
      className={cn(
        "text-xs font-medium px-2 py-0.5 rounded-full",
        styles[status]
      )}
    >
      {labels[status]}
    </span>
  );
};

export const EncodingProgress: React.FC<EncodingProgressProps> = ({
  type,
  uploadProgress,
  thumbnails,
  qualities,
  className,
}) => {
  const isUploading = uploadProgress < 100;
  const isImage = type === "image";

  return (
    <Card className={cn("glass border-border shadow-default-color shadow-md", className)}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full"></div>
            {isImage ? "Image Processing" : "Video Processing"}
          </h3>
          {isUploading ? (
            <StatusBadge status="uploading" />
          ) : (
            <StatusBadge status="encoding" />
          )}
        </div>

        {/* Upload Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">S3 Upload</span>
            <span className="text-muted-foreground">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} variant="default" size="md" />
          {uploadProgress === 100 && (
            <div className="flex items-center gap-2 text-xs text-success">
              <CheckCircle2 className="h-3 w-3" />
              Upload completed to S3
            </div>
          )}
        </div>

        {/* Image Thumbnails Generation */}
        {isImage && thumbnails && uploadProgress === 100 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-border"></div>
              <span className="text-xs font-medium text-muted-foreground uppercase">
                Generating Thumbnails
              </span>
              <div className="h-px flex-1 bg-border"></div>
            </div>

            {thumbnails.map((thumbnail, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <StatusIcon status={thumbnail.status} />
                    <span className="font-medium text-foreground">
                      {thumbnail.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({thumbnail.size})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {thumbnail.progress}%
                    </span>
                    <StatusBadge status={thumbnail.status} />
                  </div>
                </div>
                <Progress
                  value={thumbnail.progress}
                  variant={
                    thumbnail.status === "completed"
                      ? "success"
                      : thumbnail.status === "failed"
                      ? "error"
                      : "default"
                  }
                  size="sm"
                />
              </div>
            ))}
          </div>
        )}

        {/* Video Qualities Encoding */}
        {!isImage && qualities && uploadProgress === 100 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-border"></div>
              <span className="text-xs font-medium text-muted-foreground uppercase">
                Encoding Qualities
              </span>
              <div className="h-px flex-1 bg-border"></div>
            </div>

            {qualities.map((quality, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <StatusIcon status={quality.status} />
                    <span className="font-medium text-foreground">
                      {quality.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({quality.resolution}
                      {quality.bitrate && ` • ${quality.bitrate}`})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {quality.progress}%
                    </span>
                    <StatusBadge status={quality.status} />
                  </div>
                </div>
                <Progress
                  value={quality.progress}
                  variant={
                    quality.status === "completed"
                      ? "success"
                      : quality.status === "failed"
                      ? "error"
                      : "default"
                  }
                  size="sm"
                />
              </div>
            ))}
          </div>
        )}

        {/* Overall Status */}
        {uploadProgress === 100 && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">Overall Progress</span>
              <span className="text-muted-foreground">
                {isImage
                  ? `${thumbnails?.filter((t) => t.status === "completed").length || 0}/${thumbnails?.length || 0} thumbnails`
                  : `${qualities?.filter((q) => q.status === "completed").length || 0}/${qualities?.length || 0} qualities`}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};