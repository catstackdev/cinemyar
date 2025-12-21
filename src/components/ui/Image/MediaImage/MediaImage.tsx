import { useState, useEffect, useRef, useMemo, forwardRef } from "react";
import { cn } from "@/utils/helpers/classNames";
import type { MediaImageProps } from "./MediaImage.types";
import { getResponsiveImageData } from "./constants";
import type { ImageLoadingState } from "../Image.types";
import { imageAspectRatios, imageFits } from "../constants";

const MediaImage = forwardRef<HTMLImageElement, MediaImageProps>(
  (
    {
      imageUrls,
      imageUrlsConfig,
      src: propSrc,
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
    // Determine initial src
    const initialSrc = useMemo(() => {
      if (imageUrls && imageUrlsConfig) {
        return (
          imageUrls[imageUrlsConfig.mapping.sm] ||
          imageUrls[imageUrlsConfig.mapping.md] ||
          imageUrls.original ||
          propSrc
        );
      }
      return propSrc || placeholder;
    }, [propSrc, imageUrls, imageUrlsConfig, placeholder]);

    // Build responsive classes
    const responsiveClasses = useMemo(() => {
      if (!imageUrlsConfig?.imageClasses) return "";
      const { sm, md, lg, xl } = imageUrlsConfig.imageClasses;
      return cn(sm, md && `md:${md}`, lg && `lg:${lg}`, xl && `xl:${xl}`);
    }, [imageUrlsConfig]);

    // Get responsive sources for <picture>
    const sources = useMemo(() => {
      if (!imageUrls || !imageUrlsConfig) return null;
      return getResponsiveImageData(imageUrls, imageUrlsConfig);
    }, [imageUrls, imageUrlsConfig]);

    // State management (mirrors Image component)
    const [imgSrc, setImgSrc] = useState<string | undefined>(
      initialSrc || placeholder,
    );
    const [loadingState, setLoadingState] = useState<ImageLoadingState>("idle");
    const [progress, setProgress] = useState(0);
    const [hasError, setHasError] = useState(false);
    const [showImage, setShowImage] = useState(true);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
      if (!initialSrc) {
        setImgSrc(placeholder);
        setLoadingState("idle");
        setHasError(false);
        setProgress(0);
        setShowImage(!!placeholder);
        return;
      }

      setImgSrc(initialSrc);
      setHasError(false);
      setProgress(0);
      setShowImage(true);

      const img = imgRef.current;
      if (img?.complete && img?.naturalHeight !== 0) {
        setLoadingState("loaded");
        setProgress(100);
        return;
      }

      setLoadingState("loading");

      if (!showProgress) return;

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
    }, [initialSrc, placeholder, showProgress]);

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
      setLoadingState("loaded");
      setProgress(100);
      onLoad?.();
    };

    // Null/Error states
    if (!initialSrc && !placeholder) {
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
        {/* Progress overlay */}
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
              <div className="w-32 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Responsive Picture or standard img */}
        {showImage && (
          <>
            {sources ? (
              <picture>
                {sources.map((source, idx) => (
                  <source
                    key={idx}
                    media={source.media}
                    srcSet={source.src || undefined}
                  />
                ))}
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
                  onLoad={handleLoad}
                  className={cn(
                    "block w-full h-full",
                    imageFits[fit],
                    imageAspectRatios[aspectRatio],
                    responsiveClasses,
                    loadingState === "loading"
                      ? "opacity-0"
                      : "opacity-100 transition-opacity duration-500",
                    className,
                  )}
                  {...props}
                />
              </picture>
            ) : (
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
                onLoad={handleLoad}
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
          </>
        )}
      </div>
    );
  },
);

MediaImage.displayName = "MediaImage";

export default MediaImage;
