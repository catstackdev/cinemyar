import React from "react";
import { cn } from "@/utils/helpers/classNames";
import type { MediaItemPreviewProps } from "./MediaItemPreview.types";
import { Image, Button } from "@/components/ui";

const MediaItemPreview: React.FC<MediaItemPreviewProps> = ({
  type,
  label,
  src,
  dimensions,
  className,
  ...rest
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...rest}>
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="text-[10px] text-muted-foreground/60">
          {dimensions}
        </span>
      </div>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-md border border-border bg-black/5",
          // Force square aspect ratio if it's an icon
          type === "icon" ? "aspect-square" : "aspect-video",
        )}
      >
        <div className="group  relative  w-full  rounded-md border bg-black/5">
          <Image
            className={cn(
              "h-full w-full object-cover",
              "transition-all duration-300 ease-out",
              "group-hover:brightness-110",
            )}
            fallbackElement={
              <div className="h-full w-full bg-gradient-to-br from-primary/20 to-warning/20 flex items-center justify-center">
                <span className="font-display text-6xl text-primary/20">
                  {type}
                </span>
              </div>
            }
            src={src}
            alt={label}
          />

          {/* Overlay that appears on hover to show true dimensions */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              variant="glass"
              size="xs"
              onClick={() => window.open(src, "_blank")}
            >
              View Original Size
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MediaItemPreview;
