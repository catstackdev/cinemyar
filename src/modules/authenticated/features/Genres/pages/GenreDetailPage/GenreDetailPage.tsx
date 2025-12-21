import React, { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import styles from "./GenreDetailPage.module.css";
import type { GenreDetailPageProps } from "./GenreDetailPage.types";
import { useLoaderData, useParams } from "react-router-dom";
import type { ApiResponse, GenreDetailData } from "@/shared/types/types";
import { useAdminGenre } from "../../hooks/useAdminGenres";
import type { TabItem } from "@/components/ui";
import {
  Card,
  Tabs,
  Badge,
  Stack,
  Skeleton,
  EmptyState,
} from "@/components/ui";
import {
  ImageIcon,
  Image as ImageIconLucide,
  FileImage,
  CheckCircle,
  XCircle,
  CircleX,
} from "lucide-react";
import type { GenreMediaItem } from "@/shared/types/types/genre";
import MediaItem from "../../components/MediaItem";
import { GenreImg } from "../../components";
import { MediaImage } from "@/components/ui/Image";

const GenreDetailPage: React.FC<GenreDetailPageProps> = ({
  children,
  className,
}) => {
  const { id } = useParams<{ id: string }>();
  const initialData = useLoaderData<ApiResponse<GenreDetailData>>();

  // Fetch genre with react-query (with initialData from loader)
  const { data: genreDetail } = useAdminGenre(id);

  // Local state for media items
  const [icons, setIcons] = useState<GenreMediaItem[]>([]);
  const [banners, setBanners] = useState<GenreMediaItem[]>([]);
  const [thumbnails, setThumbnails] = useState<GenreMediaItem[]>([]);

  // Update local state when data changes
  useEffect(() => {
    setIcons(genreDetail?.data?.icons ?? initialData?.data?.icons ?? []);
  }, [genreDetail?.data?.icons, initialData?.data?.icons]);

  useEffect(() => {
    setBanners(genreDetail?.data?.banners ?? initialData?.data?.banners ?? []);
  }, [genreDetail?.data?.banners, initialData?.data?.banners]);

  useEffect(() => {
    setThumbnails(
      genreDetail?.data?.thumbnails ?? initialData?.data?.thumbnails ?? [],
    );
  }, [genreDetail?.data?.thumbnails, initialData?.data?.thumbnails]);

  const genre = genreDetail?.data ?? initialData?.data;

  // Status badge helper
  const getMediaStatusBadge = (
    activeVersion: number | null,
    itemsLength: number,
  ) => {
    if (activeVersion) {
      return (
        <Badge variant="success" className="gap-2">
          <CheckCircle className="w-3 h-3" />
          Published (v{activeVersion})
        </Badge>
      );
    }

    if (itemsLength === 0) {
      return (
        <Badge variant="danger" className="gap-2">
          <XCircle className="w-3 h-3" />
          No media
        </Badge>
      );
    }

    return (
      <Badge variant="warning" className="gap-2">
        <CircleX className="w-3 h-3" />
        Not published
      </Badge>
    );
  };

  // Create tab items
  const tabItems: TabItem[] = useMemo(
    () => [
      {
        id: "metadata",
        label: "Metadata",
        content: genre ? (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Genre Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Name
                </p>
                <p className="text-base text-foreground">{genre.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Slug
                </p>
                <p className="text-base font-mono text-foreground">
                  {genre.slug}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Status
                </p>
                <Badge variant={genre.isActive ? "success" : "secondary"}>
                  {genre.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Order
                </p>
                <p className="text-base text-foreground">{genre.order}</p>
              </div>
              {genre.parentId && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Parent Genre
                  </p>
                  <p className="text-base text-foreground">
                    {genre.parent?.name ?? genre.parentId}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Movies
                </p>
                <p className="text-base text-foreground">
                  {genre._count?.movies ?? 0}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Created At
                </p>
                <p className="text-base text-foreground">
                  {new Date(genre.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Updated At
                </p>
                <p className="text-base text-foreground">
                  {new Date(genre.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            {genre.description && (
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Description
                </p>
                <p className="text-base text-foreground">{genre.description}</p>
              </div>
            )}
          </Card>
        ) : null,
      },
      {
        id: "icons",
        label: `Icons (${icons.length})`,
        content: genre ? (
          <Card className="p-6">
            <Stack
              direction="horizontal"
              justify="between"
              align="center"
              className="mb-6"
            >
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Icon Media
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage icon versions and their status
                </p>
              </div>
              {getMediaStatusBadge(genre.activeIconVersion, icons.length)}
            </Stack>

            {/* Current Active Icon Preview */}
            {genre.iconUrls && (
              <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Current Active Icon
                  {genre.activeIconVersion && (
                    <span> (Version: v{genre.activeIconVersion})</span>
                  )}
                </p>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Original
                    </p>
                    <GenreImg
                      imageUrls={genre.iconUrls}
                      size="original"
                      aspectRatio="square"
                      alt={`${genre.name} icon (original)`}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Large (LG)
                    </p>
                    <GenreImg
                      imageUrls={genre.iconUrls}
                      size="lg"
                      aspectRatio="square"
                      alt={`${genre.name} icon (lg)`}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Medium (MD)
                    </p>
                    <GenreImg
                      imageUrls={genre.iconUrls}
                      size="md"
                      aspectRatio="square"
                      alt={`${genre.name} icon (md)`}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Small (SM)
                    </p>
                    <GenreImg
                      imageUrls={genre.iconUrls}
                      size="sm"
                      aspectRatio="square"
                      alt={`${genre.name} icon (sm)`}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Auto</p>
                    <GenreImg
                      imageUrls={genre.iconUrls}
                      size="auto"
                      aspectRatio="square"
                      alt={`${genre.name} icon (auto)`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Icon Media Items */}
            {icons.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {icons.map((item) => (
                  <div key={item.version} id={`icon-v${item.version}`}>
                    <MediaItem
                      item={item}
                      type="icon"
                      entityId={genre.id}
                      entityType="genres"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Icons"
                description="No icon media has been uploaded yet"
                icon={<ImageIcon className="w-12 h-12" />}
              />
            )}
          </Card>
        ) : null,
      },
      {
        id: "banners",
        label: `Banners (${banners.length})`,
        content: genre ? (
          <Card className="p-6">
            <Stack
              direction="horizontal"
              justify="between"
              align="center"
              className="mb-6"
            >
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <ImageIconLucide className="w-5 h-5" />
                  Banner Media
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage banner versions and their status
                </p>
              </div>
              {getMediaStatusBadge(genre.activeBannerVersion, banners.length)}
            </Stack>

            {/* Current Active Banner Preview */}
            {genre.bannerUrls && (
              <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Current Active Banner
                  {genre.activeBannerVersion && (
                    <span> (Version: v{genre.activeBannerVersion})</span>
                  )}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Large (LG)
                    </p>
                    <GenreImg
                      imageUrls={genre.bannerUrls}
                      size="lg"
                      aspectRatio="video"
                      alt={`${genre.name} banner (lg)`}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Medium (MD)
                    </p>
                    <GenreImg
                      imageUrls={genre.bannerUrls}
                      size="md"
                      aspectRatio="video"
                      alt={`${genre.name} banner (md)`}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Small (SM)
                    </p>
                    <GenreImg
                      imageUrls={genre.bannerUrls}
                      size="sm"
                      aspectRatio="video"
                      alt={`${genre.name} banner (sm)`}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Auto</p>
                    <GenreImg
                      imageUrls={genre.bannerUrls}
                      size="auto"
                      aspectRatio="video"
                      alt={`${genre.name} banner (auto)`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Banner Media Items */}
            {banners.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {banners.map((item) => (
                  <div key={item.version} id={`banner-v${item.version}`}>
                    <MediaItem
                      item={item}
                      type="banner"
                      entityId={genre.id}
                      entityType="genres"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Banners"
                description="No banner media has been uploaded yet"
                icon={<ImageIconLucide className="w-12 h-12" />}
              />
            )}
          </Card>
        ) : null,
      },
      {
        id: "thumbnails",
        label: `Thumbnails (${thumbnails.length})`,
        content: genre ? (
          <Card className="p-6">
            <Stack
              direction="horizontal"
              justify="between"
              align="center"
              className="mb-6"
            >
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FileImage className="w-5 h-5" />
                  Thumbnail Media
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage thumbnail versions and their status
                </p>
              </div>
              {getMediaStatusBadge(
                genre.activeThumbnailVersion,
                thumbnails.length,
              )}
            </Stack>

            {/* Current Active Thumbnail Preview */}
            {genre.thumbnailUrls && (
              <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Current Active Thumbnail
                  {genre.activeThumbnailVersion && (
                    <span> (Version: v{genre.activeThumbnailVersion})</span>
                  )}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Large (LG)
                    </p>
                    <GenreImg
                      imageUrls={genre.thumbnailUrls}
                      size="lg"
                      aspectRatio="video"
                      alt={`${genre.name} thumbnail (lg)`}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Medium (MD)
                    </p>
                    <GenreImg
                      imageUrls={genre.thumbnailUrls}
                      size="md"
                      aspectRatio="video"
                      alt={`${genre.name} thumbnail (md)`}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Small (SM)
                    </p>
                    <GenreImg
                      imageUrls={genre.thumbnailUrls}
                      size="sm"
                      aspectRatio="video"
                      alt={`${genre.name} thumbnail (sm)`}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Auto</p>
                    <GenreImg
                      imageUrls={genre.thumbnailUrls}
                      size="auto"
                      aspectRatio="video"
                      alt={`${genre.name} thumbnail (auto)`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Thumbnail Media Items */}
            {thumbnails.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {thumbnails.map((item) => (
                  <div key={item.version} id={`thumbnail-v${item.version}`}>
                    <MediaItem
                      item={item}
                      type="thumbnail"
                      entityId={genre.id}
                      entityType="genres"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Thumbnails"
                description="No thumbnail media has been uploaded yet"
                icon={<FileImage className="w-12 h-12" />}
              />
            )}
          </Card>
        ) : null,
      },
    ],
    [genre, icons, banners, thumbnails],
  );

  if (!genre) {
    return (
      <div className={clsx(styles.root, className)}>
        <Card className="p-6">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </Card>
      </div>
    );
  }

  return (
    <div className={clsx(styles.root, "p-4 ", className)}>
      {/* Sticky Header with Banner Background */}
      <div className="sticky top-0 z-10 mb-6">
        {/* Banner Background */}
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          {/* Banner Image */}
          {genre.bannerUrls ? (
            <div className="absolute inset-0">
              <MediaImage
                imageUrls={genre.bannerUrls}
                imageUrlsConfig={{
                  imageClasses: {
                    sm: "w-full h-full",
                    md: "w-full h-full",
                    lg: "w-full h-full",
                    xl: "w-full h-full",
                  },
                  mapping: {
                    sm: "sm",
                    md: "md",
                    lg: "lg",
                    xl: "original",
                  },
                }}
                fit="cover"
                showProgress
                alt={`${genre.name} banner`}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background"></div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/40 to-background"></div>
          )}

          {/* Header Content */}
          <div className="relative h-full flex items-end p-6">
            <Stack direction="horizontal" spacing="md" align="center">
              {/* Icon */}
              {genre.iconUrls ? (
                <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-background shadow-lg flex-shrink-0 bg-background">
                  <GenreImg
                    imageUrls={genre.iconUrls}
                    size="auto"
                    aspectRatio="square"
                    alt={`${genre.name} icon`}
                    showSize={false}
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-background shadow-lg flex-shrink-0 bg-muted/30 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                </div>
              )}

              {/* Title and Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground drop-shadow-lg mb-1">
                  {genre.name}
                </h1>
                <p className="text-sm text-foreground/90 drop-shadow">
                  Slug: <span className="font-mono">{genre.slug}</span> •
                  Movies: {genre._count?.movies ?? 0}
                </p>
              </div>

              {/* Status Badges */}
              <Stack direction="vertical" spacing="xs" align="end">
                <Badge
                  variant={genre.isActive ? "success" : "secondary"}
                  className="gap-2 shadow-sm"
                >
                  {genre.isActive ? "Active" : "Inactive"}
                </Badge>
                {genre.isFeatured && (
                  <Badge variant="info" className="shadow-sm">
                    Featured
                  </Badge>
                )}
              </Stack>
            </Stack>
          </div>
        </div>

        {/* Sticky Tabs */}
        <div className="bg-background border-b border-border shadow-sm">
          <Tabs items={tabItems} defaultTab="metadata" className="w-full" />
        </div>
      </div>

      {children}
    </div>
  );
};

export default GenreDetailPage;
