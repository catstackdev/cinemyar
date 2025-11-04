import React, { useState } from "react";
import { CheckCircle2, Download, Eye, Maximize2 } from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import Image from "@/components/ui/Image";
import { cn } from "@/utils/helpers/classNames";

export interface ThumbnailItem {
  name: string;
  size: string;
  url: string;
  fileSize?: string;
  isGenerated: boolean;
}

interface ThumbnailGalleryProps {
  posterUrl: string;
  thumbnails: ThumbnailItem[];
  className?: string;
}

export const ThumbnailGallery: React.FC<ThumbnailGalleryProps> = ({
  posterUrl,
  thumbnails,
  className,
}) => {
  const [selectedThumbnail, setSelectedThumbnail] = useState<string>(posterUrl);
  const [selectedName, setSelectedName] = useState<string>("Original");

  return (
    <Card className={cn("glass border-border shadow-default-color shadow-md", className)}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full"></div>
            Generated Thumbnails
          </h3>
          <Badge variant="secondary" className="bg-success/10 text-success">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            {thumbnails.filter(t => t.isGenerated).length}/{thumbnails.length} Ready
          </Badge>
        </div>

        {/* Preview Area */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary/20 border-2 border-border">
          <Image
            src={selectedThumbnail}
            alt={selectedName}
            className="w-full h-full object-contain"
            placeholder="movie"
          />
          
          {/* Size Info Overlay */}
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="glass text-foreground font-medium">
              {selectedName}
            </Badge>
          </div>

          {/* Actions Overlay */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="glass backdrop-blur-md bg-background/80 hover:bg-background"
              onClick={() => window.open(selectedThumbnail, '_blank')}
            >
              <Maximize2 className="h-4 w-4 mr-1" />
              Full Size
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="glass backdrop-blur-md bg-background/80 hover:bg-background"
              onClick={() => {
                const link = document.createElement('a');
                link.href = selectedThumbnail;
                link.download = `${selectedName}.jpg`;
                link.click();
              }}
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">
            Available Sizes
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {thumbnails.map((thumb, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedThumbnail(thumb.url);
                  setSelectedName(thumb.name);
                }}
                className={cn(
                  "relative group rounded-lg overflow-hidden border-2 transition-all",
                  selectedThumbnail === thumb.url
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50",
                  !thumb.isGenerated && "opacity-50 cursor-not-allowed"
                )}
                disabled={!thumb.isGenerated}
              >
                {/* Thumbnail Image */}
                <div className="aspect-video bg-secondary/20">
                  <Image
                    src={thumb.url}
                    alt={thumb.name}
                    className="w-full h-full object-cover"
                    placeholder="movie"
                  />
                </div>

                {/* Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <div className="text-white text-xs font-medium truncate">
                      {thumb.name}
                    </div>
                    <div className="text-white/70 text-[10px]">
                      {thumb.size}
                    </div>
                    {thumb.fileSize && (
                      <div className="text-white/50 text-[10px]">
                        {thumb.fileSize}
                      </div>
                    )}
                  </div>
                </div>

                {/* Selected Indicator */}
                {selectedThumbnail === thumb.url && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-primary rounded-full p-1">
                      <Eye className="h-3 w-3 text-white" />
                    </div>
                  </div>
                )}

                {/* Not Generated Overlay */}
                {!thumb.isGenerated && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-xs text-white font-medium">
                      Generating...
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Size Information */}
        <div className="pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            <p className="mb-2">
              <span className="font-medium text-foreground">Current:</span> {selectedName} ({thumbnails.find(t => t.url === selectedThumbnail)?.size || 'N/A'})
            </p>
            <p className="text-[10px]">
              Thumbnails are automatically generated in multiple sizes for optimal loading performance across different devices.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};