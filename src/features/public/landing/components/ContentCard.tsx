import React from "react";
import { cn } from "@/utils/helpers";
import { Image } from "@/components/ui";

interface ContentCardProps {
  title: string;
  year: number;
  genre: string;
  rating: number;
  imageUrl: string;
  type: "movie" | "series" | "web";
  duration?: string;
  seasons?: number;
  className?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  year,
  genre,
  rating,
  imageUrl,
  type,
  duration,
  seasons,
  className,
}) => {
  const formatRating = (rating: number) => {
    return (rating / 10).toFixed(1);
  };

  const getTypeIcon = () => {
    switch (type) {
      case "movie":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v22a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8m-8 0V4a1 1 0 00-1 1v14a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-1-1V4"
            />
          </svg>
        );
      case "series":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
            />
          </svg>
        );
      case "web":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        );
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case "movie":
        return duration || "Movie";
      case "series":
        return seasons
          ? `${seasons} Season${seasons > 1 ? "s" : ""}`
          : "Series";
      case "web":
        return "Web Series";
    }
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl",
        "bg-card border border-border/50",
        "hover:border-border transition-all duration-300",
        "hover:shadow-lg hover:shadow-primary/10",
        "hover:-translate-y-1",
        className,
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fit="cover"
          showProgress={true}
          className={cn(
            "h-full w-full object-cover",
            "transition-all duration-300 ease-out",
            "group-hover:brightness-110",
          )}
          fallbackElement={
            <div className="h-full w-full bg-gradient-to-br from-primary/20 to-warning/20 flex items-center justify-center">
              <span className="font-display text-6xl text-primary/20">
                POSTER
              </span>
            </div>
          }
        />

        {/* placeholder="https://placehold.co/400x600?text=No+Movie+Poster" */}

        {/* Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          )}
        />

        {/* Rating Badge */}
        <div
          className={cn(
            "absolute top-3 right-3 px-2 py-1 rounded-md",
            "bg-black/80 backdrop-blur-sm",
            "flex items-center gap-1 text-xs font-medium text-white",
          )}
        >
          <svg
            className="w-3 h-3 text-warning fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {formatRating(rating)}
        </div>

        {/* Type Badge */}
        <div
          className={cn(
            "absolute top-3 left-3 px-2 py-1 rounded-md",
            "bg-primary/90 backdrop-blur-sm",
            "flex items-center gap-1 text-xs font-medium text-primary-foreground",
          )}
        >
          {getTypeIcon()}
          <span className="capitalize">{type}</span>
        </div>

        {/* Play Button Overlay */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          )}
        >
          <div
            className={cn(
              "w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm",
              "flex items-center justify-center",
              "border border-white/30",
              "hover:bg-white/30 transition-colors duration-200 cursor-pointer",
            )}
          >
            <svg
              className="w-6 h-6 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M8 5v10l8-5-8-5z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className={cn(
            "font-semibold text-foreground mb-1 line-clamp-2",
            "group-hover:text-primary transition-colors duration-200",
          )}
        >
          {title}
        </h3>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>{year}</span>
          <span>{getTypeLabel()}</span>
        </div>

        <p className="text-xs text-muted-foreground capitalize">{genre}</p>
      </div>
    </div>
  );
};

export default ContentCard;

