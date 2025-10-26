import { forwardRef, useState, useEffect } from "react";
import type { ImageProps } from "./Image.types";
import { cn } from "@/utils/helpers/classNames";
import { imageFits, imageAspectRatios } from "./constants";

const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      fallback,
      fit = "cover",
      aspectRatio = "auto",
      lazy = true,
      className,
      onError,
      ...props
    },
    ref,
  ) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      setImgSrc(src);
      setHasError(false);
    }, [src]);

    const handleError = () => {
      if (!hasError && fallback) {
        setImgSrc(fallback);
        setHasError(true);
      }
      onError?.();
    };

    return (
      <img
        ref={ref}
        src={imgSrc}
        alt={alt}
        loading={lazy ? "lazy" : "eager"}
        onError={handleError}
        className={cn(
          "block",
          imageFits[fit],
          imageAspectRatios[aspectRatio],
          className,
        )}
        {...props}
      />
    );
  },
);

Image.displayName = "Image";

export default Image;
