import React from "react";
import { cn } from "@/utils/helpers/classNames";
import type { StepFiveProps } from "./StepFive.types";
import { Badge } from "@/components/ui";
import {
  CheckCircle,
  XCircle,
  ImageIcon,
  Image,
  FileImage,
} from "lucide-react";

const StepFive: React.FC<StepFiveProps> = ({
  genreName,
  iconStatus,
  bannerStatus,
  thumbnailStatus,
  className,
  ...rest
}) => {
  const getStatusIcon = (status: string | null | undefined) => {
    if (!status) {
      return <XCircle className="w-5 h-5 text-muted-foreground" />;
    }
    if (status === "READY" || status === "ACTIVE") {
      return <CheckCircle className="w-5 h-5 text-success" />;
    }
    if (status === "FAILED") {
      return <XCircle className="w-5 h-5 text-danger" />;
    }
    return <XCircle className="w-5 h-5 text-muted-foreground" />;
  };

  const getStatusBadge = (status: string | null | undefined) => {
    if (!status) {
      return (
        <Badge variant="glass" color="secondary">
          Not Uploaded
        </Badge>
      );
    }
    if (status === "READY" || status === "ACTIVE") {
      return (
        <Badge variant="glass" color="success">
          Uploaded
        </Badge>
      );
    }
    if (status === "FAILED") {
      return (
        <Badge variant="glass" color="danger">
          Failed
        </Badge>
      );
    }
    if (status === "PROCESSING") {
      return (
        <Badge variant="glass" color="info">
          Processing
        </Badge>
      );
    }
    return (
      <Badge variant="glass" color="secondary">
        {status}
      </Badge>
    );
  };

  const hasAnyUploads = iconStatus || bannerStatus || thumbnailStatus;

  return (
    <div
      className={cn(
        "p-4 bg-muted/50 rounded-lg overflow-auto max-h-[calc(100vh-400px)]",
        className,
      )}
      {...rest}
    >
      <div className="p-6 bg-success/10 border border-success/30 rounded-lg text-center mb-6">
        <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-success mb-2">
          Genre Created Successfully!
        </h3>
        <p className="text-lg text-foreground mb-1">{genreName}</p>
        <p className="text-sm text-muted-foreground">
          {hasAnyUploads
            ? "Your genre has been created with the following media uploads."
            : "Your genre has been created. No media was uploaded."}
        </p>
      </div>

      {/* Upload Summary */}
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground text-lg mb-3">
          Upload Summary
        </h4>

        {/* Icon Status */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <ImageIcon className="w-6 h-6 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">Genre Icon</p>
              <p className="text-xs text-muted-foreground">
                256x256px recommended
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {getStatusIcon(iconStatus)}
            {getStatusBadge(iconStatus)}
          </div>
        </div>

        {/* Banner Status */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <Image className="w-6 h-6 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">Genre Banner</p>
              <p className="text-xs text-muted-foreground">
                1920x400px recommended
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {getStatusIcon(bannerStatus)}
            {getStatusBadge(bannerStatus)}
          </div>
        </div>

        {/* Thumbnail Status */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <FileImage className="w-6 h-6 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">Genre Thumbnail</p>
              <p className="text-xs text-muted-foreground">
                400x300px recommended
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {getStatusIcon(thumbnailStatus)}
            {getStatusBadge(thumbnailStatus)}
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-info/10 border border-info/30 rounded-lg">
        <p className="text-sm text-info">
          <strong>Note:</strong> You can always upload or update these images
          later by editing the genre.
        </p>
      </div>
    </div>
  );
};

export default StepFive;
