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
      showProgress = false,
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
    const xhrRef = useRef<XMLHttpRequest | null>(null);

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
      setLoadingState("loading");

      if (!showProgress) {
        return;
      }

      const xhr = new XMLHttpRequest();
      xhrRef.current = xhr;

      xhr.open("GET", src, true);
      xhr.responseType = "blob";

      xhr.onprogress = (e: ProgressEvent) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setProgress(percentComplete);
          onProgress?.(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          setLoadingState("loaded");
          setProgress(100);
        } else {
          setLoadingState("error");
          if (fallback) {
            setImgSrc(fallback);
            setHasError(true);
          }
          onError?.();
        }
      };

      xhr.onerror = () => {
        setLoadingState("error");
        if (fallback) {
          setImgSrc(fallback);
          setHasError(true);
        }
        onError?.();
      };

      xhr.send();

      return () => {
        if (xhrRef.current) {
          xhrRef.current.abort();
        }
      };
    }, [src, placeholder, fallback, showProgress, onError, onProgress]);

    const handleError = () => {
      setLoadingState("error");
      if (!hasError && fallback) {
        setImgSrc(fallback);
        setHasError(true);
        setShowImage(true);
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

    // if (!src && !placeholder) {
    //   return (
    //     <div
    //       className={cn(
    //         "flex items-center justify-center bg-gray-200 text-gray-500 text-sm",
    //         imageAspectRatios[aspectRatio],
    //         wrapperClassName,
    //       )}
    //     >
    //       No image
    //     </div>
    //   );
    // }

    if (!src && !placeholder) {
      const fallbackManualUi = (
        <div
          className={cn(
            "flex items-center justify-center bg-gray-200 text-gray-500 text-sm font-mono ",
            imageAspectRatios[aspectRatio],
            wrapperClassName,
          )}
        >
          No Image
        </div>
      );
      if (fallbackElement) {
        return (
          <div className="relative w-full h-full">
            {/* {fallbackManualUi} */}

            {fallbackElement}
          </div>
        );
      }
      return fallbackManualUi;
    }

    if (loadingState === "error" && !fallback) {
      const fallbackManualUi = (
        <div
          className={cn(
            "flex items-center justify-center bg-gray-200 text-gray-500 text-sm font-mono ",
            imageAspectRatios[aspectRatio],
            wrapperClassName,
          )}
        >
          Failed to load image
        </div>
      );

      if (fallbackElement) {
        return (
          <div className="relative w-full h-full">
            {/* {fallbackManualUi} */}

            {fallbackElement}
          </div>
        );
      }

      return fallbackManualUi;
    }

    const imageElement = showImage ? (
      <img
        ref={ref}
        src={imgSrc}
        alt={fallback || placeholder ? "" : alt}
        aria-label={alt}
        loading={lazy ? "lazy" : "eager"}
        onError={handleError}
        onLoad={handleLoad}
        className={cn(
          "block",
          imageFits[fit],
          imageAspectRatios[aspectRatio],
          className,
        )}
        {...props}
      />
    ) : (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-300 text-gray-600 text-sm",
          imageAspectRatios[aspectRatio],
          wrapperClassName,
        )}
      >
        Failed to load image
      </div>
    );

    if (showProgress && loadingState === "loading") {
      return (
        <div className={cn("relative", wrapperClassName)}>
          {imageElement}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="text-white text-lg font-semibold mb-2">
              {Math.round(progress)}%
            </div>
            <div className="w-32 h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      );
    }

    return wrapperClassName ? (
      <div className={wrapperClassName}>{imageElement}</div>
    ) : (
      imageElement
    );
  },
);

Image.displayName = "Image";

export default Image;
