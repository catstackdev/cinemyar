import React, { useState } from "react";
import { CheckCircle2, Play, Download, Maximize2, Monitor, Smartphone, Tv } from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { cn } from "@/utils/helpers/classNames";

export interface VideoQualityItem {
  name: string;
  resolution: string;
  bitrate: string;
  url: string;
  fileSize?: string;
  isGenerated: boolean;
  recommendedFor?: string;
}

interface VideoQualitySelectorProps {
  qualities: VideoQualityItem[];
  className?: string;
}

const QualityIcon: React.FC<{ quality: string }> = ({ quality }) => {
  if (quality.includes("2K") || quality.includes("1080p")) {
    return <Tv className="h-4 w-4" />;
  } else if (quality.includes("720p")) {
    return <Monitor className="h-4 w-4" />;
  } else {
    return <Smartphone className="h-4 w-4" />;
  }
};

export const VideoQualitySelector: React.FC<VideoQualitySelectorProps> = ({
  qualities,
  className,
}) => {
  const [selectedQuality, setSelectedQuality] = useState<VideoQualityItem>(() => {
    const generated = qualities.find(q => q.isGenerated);
    return generated || qualities[0]!;
  });

  return (
    <Card className={cn("glass border-border shadow-default-color shadow-md", className)}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full"></div>
            Available Qualities
          </h3>
          <Badge variant="secondary" className="bg-success/10 text-success">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            {qualities.filter(q => q.isGenerated).length}/{qualities.length} Ready
          </Badge>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary/20 border-2 border-border">
          {selectedQuality.isGenerated ? (
            <>
              <iframe
                src={selectedQuality.url}
                title={`Video - ${selectedQuality.name}`}
                className="w-full h-full"
                allowFullScreen
              />
              
              {/* Quality Badge */}
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="glass text-foreground font-medium">
                  {selectedQuality.name}
                </Badge>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-sm text-muted-foreground">
                Encoding {selectedQuality.name}...
              </p>
            </div>
          )}
        </div>

        {/* Quality Selection Grid */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">
            Select Quality
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {qualities.map((quality, index) => (
              <button
                key={index}
                onClick={() => quality.isGenerated && setSelectedQuality(quality)}
                className={cn(
                  "relative p-4 rounded-lg border-2 transition-all text-left",
                  selectedQuality.name === quality.name
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50",
                  !quality.isGenerated && "opacity-50 cursor-not-allowed"
                )}
                disabled={!quality.isGenerated}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={cn(
                    "p-2 rounded-lg",
                    selectedQuality.name === quality.name
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary/50 text-muted-foreground"
                  )}>
                    <QualityIcon quality={quality.name} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground">
                        {quality.name}
                      </span>
                      {quality.isGenerated && selectedQuality.name === quality.name && (
                        <Badge variant="primary" className="text-xs">
                          Playing
                        </Badge>
                      )}
                      {!quality.isGenerated && (
                        <Badge variant="secondary" className="text-xs">
                          Encoding
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <div>{quality.resolution}</div>
                      <div className="flex items-center gap-2">
                        <span>{quality.bitrate}</span>
                        {quality.fileSize && (
                          <>
                            <span>•</span>
                            <span>{quality.fileSize}</span>
                          </>
                        )}
                      </div>
                      {quality.recommendedFor && (
                        <div className="text-[10px] text-primary">
                          {quality.recommendedFor}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  {quality.isGenerated && (
                    <div className="flex flex-col gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          window.open(quality.url, '_blank');
                        }}
                      >
                        <Maximize2 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          const link = document.createElement('a');
                          link.href = quality.url;
                          link.download = `video-${quality.name}.mp4`;
                          link.click();
                        }}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Quality Info */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Play className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground mb-1">
                Currently Playing: {selectedQuality.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {selectedQuality.resolution} • {selectedQuality.bitrate}
                {selectedQuality.fileSize && ` • ${selectedQuality.fileSize}`}
              </div>
              {selectedQuality.recommendedFor && (
                <div className="text-xs text-primary mt-1">
                  ✓ {selectedQuality.recommendedFor}
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 text-[10px] text-muted-foreground">
            Videos are automatically encoded in multiple qualities for optimal streaming across different devices and network speeds.
          </div>
        </div>
      </div>
    </Card>
  );
};