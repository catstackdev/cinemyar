import { forwardRef, useState, useEffect, useRef } from "react";
import type { ImageProps, ImageLoadingState } from "./Image.types";
import { cn } from "@/utils/helpers/classNames";
import { imageFits, imageAspectRatios } from "./constants";

const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      fallback,
      fallbackElement,
      placeholder,
      fit = "cover",
      aspectRatio = "auto",
      lazy = true,
      showProgress = true,
      className,
      wrapperClassName,
      onError,
      onLoad,
      onProgress,
      ...props
    },
    ref,
  ) => {
    const [imgSrc, setImgSrc] = useState<string | undefined>(
      src || placeholder,
    );
    const [loadingState, setLoadingState] = useState<ImageLoadingState>("idle");
    const [progress, setProgress] = useState(0);
    const [hasError, setHasError] = useState(false);
    const [showImage, setShowImage] = useState(true);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
      if (!src) {
        setImgSrc(placeholder);
        setLoadingState("idle");
        setHasError(false);
        setProgress(0);
        setShowImage(!!placeholder);
        return;
      }

      setImgSrc(src);
      setHasError(false);
      setProgress(0);
      setShowImage(true);

      // Check if image is already cached/loaded
      const img = imgRef.current;
      if (img?.complete && img?.naturalHeight !== 0) {
        // Image is already loaded (cached)
        setLoadingState("loaded");
        setProgress(100);
        return;
      }

      setLoadingState("loading");

      if (!showProgress) return;

      // Simulated timer stops at 90%
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }, [src, placeholder, showProgress]);

    const handleError = () => {
      setLoadingState("error");
      if (!hasError && fallback) {
        setImgSrc(fallback);
        setHasError(true);
      } else {
        setShowImage(false);
      }
      onError?.();
    };

    const handleLoad = () => {
      // THIS is what moves it from 90% to 100%
      setLoadingState("loaded");
      setProgress(100);
      onLoad?.();
    };

    // --- Handling Null/Error States ---
    if (!src && !placeholder) {
      return fallbackElement ? (
        <div className="w-full h-full">{fallbackElement}</div>
      ) : (
        <div
          className={cn(
            "flex items-center justify-center bg-gray-200 text-gray-500",
            imageAspectRatios[aspectRatio],
            wrapperClassName,
          )}
        >
          No Image
        </div>
      );
    }

    if (loadingState === "error" && !fallback) {
      return fallbackElement ? (
        <div className="w-full h-full">{fallbackElement}</div>
      ) : (
        <div
          className={cn(
            "flex items-center justify-center bg-gray-200 text-gray-500",
            imageAspectRatios[aspectRatio],
            wrapperClassName,
          )}
        >
          Failed
        </div>
      );
    }

    return (
      <div
        className={cn(
          "relative overflow-hidden w-full h-full",
          wrapperClassName,
        )}
      >
        {/* 1. THE PROGRESS UI: Overlayed on top */}
        {showProgress && loadingState === "loading" && (
          <div
            className={cn(
              "absolute inset-0 z-10 flex items-center justify-center backdrop-blur",
              imageAspectRatios[aspectRatio],
            )}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="text-muted-foreground text-sm font-medium">
                Loading {Math.round(progress)}%
              </div>
              <div className="w-32 h-2  rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. THE IMAGE: Always rendered, but hidden until loaded */}
        {showImage && (
          <img
            ref={(node) => {
              imgRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            src={imgSrc}
            alt={alt}
            loading={lazy ? "lazy" : "eager"}
            onError={handleError}
            onLoad={handleLoad} // Triggers the jump to 100%
            className={cn(
              "block w-full h-full",
              imageFits[fit],
              imageAspectRatios[aspectRatio],
              loadingState === "loading"
                ? "opacity-0"
                : "opacity-100 transition-opacity duration-500",
              className,
            )}
            {...props}
          />
        )}
      </div>
    );
  },
);

Image.displayName = "Image";

export default Image;
