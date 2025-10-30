import React from "react";
import { Card, Image } from "@/components/ui";
import { cn } from "@/utils/helpers/classNames";
import type { MovieItemCardProps } from "./MovieItemCard.types";

const MovieItemCard: React.FC<MovieItemCardProps> = ({
  title,
  description,
  imageUrl,
  onClick,
  className,
}) => {
  return (
    <div
      className={cn(
        "group relative cursor-pointer",
        "transition-all duration-300 ease-out",
        "hover:z-10",
        className
      )}
      onClick={onClick}
    >
      <Card
        className={cn(
          "h-80 w-full rounded-lg overflow-hidden",
          "transition-all duration-300 ease-out",
          "group-hover:scale-105 group-hover:shadow-2xl",
          "border border-gray-200 dark:border-gray-700"
        )}
      >
        <div className="relative h-full w-full">
          <Image
            src={imageUrl}
            alt={title}
            fit="cover"
            placeholder="https://via.placeholder.com/400x600?text=No+Movie+Poster"
            showProgress={true}
            fallback="https://via.placeholder.com/400x600?text=Image+Failed"
            className={cn(
              "h-full w-full object-cover",
              "transition-all duration-300 ease-out",
              "group-hover:brightness-110"
            )}
          />
          <div
            className={cn(
              "absolute inset-0",
              "bg-gradient-to-t from-black/80 via-black/20 to-transparent",
              "opacity-0 group-hover:opacity-100",
              "transition-opacity duration-300 ease-out"
            )}
          >
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-lg font-bold mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {title}
              </h3>
              {description && (
                <p className="text-sm text-gray-200 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MovieItemCard;
