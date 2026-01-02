import React, { useCallback } from "react";
import type { GenreDetailPageProps } from "./GenreDetailPage.types";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import type { ApiResponse, GenreDetailData } from "@/shared/types";
import { useAdminGenre, useSolfDeleteGenre } from "../../hooks/useAdminGenres";
import {
  Card,
  Badge,
  Button,
  Container,
  EmptyState,
  Skeleton,
  Stack,
} from "@/components/ui";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import {
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Calendar,
  Hash,
  FolderTree,
  ImageIcon,
  LayoutDashboard,
  FileImage,
} from "lucide-react";
import { formatDate } from "@/utils/helpers";
import { GenreImg } from "../../components";
import { ConfirmDialog, PermissionGuard } from "@/components/common";
import { useModal, useCan } from "@/hooks";
import { GenrePermissions } from "@/shared/constants";
import { MediaImage } from "@/components/ui/Image";
import { AddNewGenres } from "../../components/modals";

const GenreDetailPage: React.FC<GenreDetailPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const initialData = useLoaderData<ApiResponse<GenreDetailData>>();

  const createUpdateModal = useModal<any>();

  // Fetch genre with react-query
  const { data: genreDetail, isLoading } = useAdminGenre(id);
  const genre = (genreDetail?.data ?? initialData?.data) as
    | GenreDetailData
    | undefined;

  // Modals
  const deleteModal = useModal();

  // Permissions
  const canEdit = useCan({ permissions: GenrePermissions.EDIT });
  const canDelete = useCan({ permissions: GenrePermissions.DELETE });

  // Mutations
  const { mutate: deleteGenre, isPending: isDeleting } = useSolfDeleteGenre();

  // Handlers
  const handleEdit = useCallback(() => {
    console.log("🔐 GenreDetailPage: Opening update modal for", genre);
    genre && createUpdateModal.open(genre as any);
  }, [createUpdateModal, genre]);
  const handleModalClose = useCallback(
    (open: boolean) => {
      if (!open) {
        createUpdateModal.close();
      }
    },
    [createUpdateModal],
  );

  const handleDelete = () => {
    deleteModal.open();
  };

  const confirmDelete = useCallback(() => {
    if (genre?.id) {
      deleteGenre(genre.id, {
        onSuccess: () => {
          deleteModal.close();
          navigate("/authenticated/genres");
        },
      });
    }
  }, [genre?.id, deleteGenre, deleteModal, navigate]);

  const handleChildClick = (childId: string) => {
    navigate(`/authenticated/genres/${childId}`);
  };

  if (!genre && !isLoading) {
    return (
      <Container size="lg" className="py-8">
        <EmptyState
          title="Genre not found"
          description="The genre you're looking for doesn't exist."
        />
      </Container>
    );
  }

  return (
    <Container size="full" className="p-4 space-y-6">
      <PermissionGuard permissions={GenrePermissions.EDIT} roles={["ADMIN"]}>
        <AddNewGenres
          key={createUpdateModal.data?.id ?? "create"}
          open={createUpdateModal.isOpen}
          onOpenChange={handleModalClose}
          genre={createUpdateModal.data ?? null}
        />
      </PermissionGuard>
      {/* Delete Confirmation Modal */}

      <PermissionGuard permissions={GenrePermissions.DELETE}>
        <ConfirmDialog
          open={deleteModal.isOpen}
          onOpenChange={deleteModal.close}
          onConfirm={confirmDelete}
          title="Delete Genre"
          description={`Are you sure you want to delete "${genre?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
          isLoading={isDeleting}
        />
      </PermissionGuard>

      {/* Header Card */}
      <Card className="glass border-border/50 shadow-xl">
        {/* <CardHeader className="bg-gradient-to-r from-primary/5 via-transparent to-info/5 "> */}
        <CardHeader className="relative min-h-48 overflow-hidden rounded-t-lg">
          {genre?.bannerUrls ? (
            <div className="absolute inset-0 -z-1">
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
                alt={`${genre?.name} banner`}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background"></div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/40 to-background"></div>
          )}
          <div className="flex items-start justify-between">
            <div className="flex-1 flex flex-col gap-3">
              {/* <div className="flex items-center gap-3 mb-2"> */}
              {/*   <Button */}
              {/*     variant="glass" */}
              {/*     size="sm" */}
              {/*     leftIcon={<ArrowLeft className="w-4 h-4" />} */}
              {/*     onClick={handleBack} */}
              {/*   > */}
              {/*     Back */}
              {/*   </Button> */}
              {/* </div> */}

              {isLoading ? (
                <Skeleton className="h-10 w-96 mb-2" />
              ) : (
                <Stack direction="horizontal" spacing="md" align="center">
                  {genre?.iconUrls ? (
                    <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-background shadow-lg flex-shrink-0 bg-background">
                      <GenreImg
                        imageUrls={genre.iconUrls}
                        size="auto"
                        aspectRatio="square"
                        alt={`${genre?.name} icon`}
                        showSize={false}
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-background shadow-lg flex-shrink-0 bg-muted/30 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}

                  <Stack direction="vertical" spacing="sm">
                    <div className="flex items-center gap-3 flex-wrap">
                      <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
                        {genre?.name}
                      </CardTitle>
                      <Badge
                        variant={genre?.isActive ? "success" : "secondary"}
                      >
                        {genre?.isActive ? "Active" : "Inactive"}
                      </Badge>
                      {genre?.isFeatured && (
                        <Badge variant="warning" size="sm">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-lg font-mono text-muted-foreground">
                        {genre?.slug}
                      </p>
                      {genre?.parentId && (
                        <>
                          <span className="text-muted-foreground">•</span>
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 text-sm hover:text-primary"
                            onClick={() => handleChildClick(genre.parentId!)}
                          >
                            <FolderTree className="w-3 h-3 mr-1" />
                            Parent: {genre.parent?.name ?? genre.parentId}
                          </Button>
                        </>
                      )}
                    </div>
                  </Stack>
                </Stack>
              )}
              {isLoading ? (
                <Skeleton className="h-10 w-96 mb-2 " />
              ) : (
                genre?.description && (
                  <CardDescription className="text-base max-w-3xl ml-6">
                    {genre.description}
                  </CardDescription>
                )
              )}
            </div>

            {!isLoading && (
              <div className="flex gap-2">
                {canEdit && (
                  <Button
                    variant="glass"
                    size="sm"
                    leftIcon={<Edit className="w-4 h-4" />}
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                )}
                {canDelete && (
                  <Button
                    variant="glass"
                    color="danger"
                    size="sm"
                    leftIcon={<Trash2 className="w-4 h-4" />}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Metadata Card */}
      <Card className="glass border-border/50 shadow-xl">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-primary" />
            Metadata
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Order
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {genre?.order ?? "—"}
                </p>
              </div>

              {genre?.parentId && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                    <FolderTree className="w-3 h-3" />
                    Parent Genre
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-2xl font-bold hover:text-primary transition-colors"
                    onClick={() => handleChildClick(genre.parentId!)}
                  >
                    {genre.parent?.name ?? "View Parent"}
                  </Button>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Movies
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {genre?._count?.movies ?? 0}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Children Genres
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {genre?.children?.length ?? 0}
                </p>
              </div>
              {genre?.parent?.id && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                    <FolderTree className="w-3 h-3" />
                    Parent Genre
                  </p>
                  <p
                    className="text-2xl font-bold text-foreground hover:underline hover:text-primary cursor-pointer"
                    onClick={() => handleChildClick(genre?.parent?.id!)}
                  >
                    {genre?.parent?.name ?? "View Parent"}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Created At
                </p>
                <p className="text-sm font-mono text-foreground">
                  {genre?.createdAt ? formatDate(genre.createdAt) : "—"}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Updated At
                </p>
                <p className="text-sm font-mono text-foreground">
                  {genre?.updatedAt ? formatDate(genre.updatedAt) : "—"}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Media Card */}
      <Card className="glass border-border/50 shadow-xl">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            Published Media
          </CardTitle>
          <CardDescription>
            Currently active media displayed on the website
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Icon */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-primary" />
                    Icon
                  </h3>
                  {genre?.activeIconVersion ? (
                    <Badge variant="success" size="sm">
                      <CheckCircle className="w-3 h-3 mr-1" />v
                      {genre.activeIconVersion}
                    </Badge>
                  ) : (
                    <Badge variant="danger" size="sm">
                      <XCircle className="w-3 h-3 mr-1" />
                      Not Published
                    </Badge>
                  )}
                </div>
                <div className="border border-border rounded-lg p-4 bg-card/50 flex items-center justify-center min-h-[200px]">
                  {genre?.iconUrls ? (
                    <GenreImg
                      imageUrls={genre.iconUrls}
                      size="lg"
                      aspectRatio="square"
                      alt={`${genre.name} icon`}
                    />
                  ) : (
                    <EmptyState
                      title="No Icon"
                      description="Upload an icon"
                      icon={<ImageIcon className="w-12 h-12" />}
                    />
                  )}
                </div>
              </div>

              {/* Banner */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-primary" />
                    Banner
                  </h3>
                  {genre?.activeBannerVersion ? (
                    <Badge variant="success" size="sm">
                      <CheckCircle className="w-3 h-3 mr-1" />v
                      {genre.activeBannerVersion}
                    </Badge>
                  ) : (
                    <Badge variant="danger" size="sm">
                      <XCircle className="w-3 h-3 mr-1" />
                      Not Published
                    </Badge>
                  )}
                </div>
                <div className="border border-border rounded-lg p-4 bg-card/50 flex items-center justify-center min-h-[200px]">
                  {genre?.bannerUrls ? (
                    <GenreImg
                      imageUrls={genre.bannerUrls}
                      size="lg"
                      aspectRatio="auto"
                      alt={`${genre.name} banner`}
                    />
                  ) : (
                    <EmptyState
                      title="No Banner"
                      description="Upload a banner"
                      icon={<LayoutDashboard className="w-12 h-12" />}
                    />
                  )}
                </div>
              </div>

              {/* Thumbnail */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <FileImage className="w-4 h-4 text-primary" />
                    Thumbnail
                  </h3>
                  {genre?.activeThumbnailVersion ? (
                    <Badge variant="success" size="sm">
                      <CheckCircle className="w-3 h-3 mr-1" />v
                      {genre.activeThumbnailVersion}
                    </Badge>
                  ) : (
                    <Badge variant="danger" size="sm">
                      <XCircle className="w-3 h-3 mr-1" />
                      Not Published
                    </Badge>
                  )}
                </div>
                <div className="border border-border rounded-lg p-4 bg-card/50 flex items-center justify-center min-h-[200px]">
                  {genre?.thumbnailUrls ? (
                    <GenreImg
                      imageUrls={genre.thumbnailUrls}
                      size="lg"
                      aspectRatio="auto"
                      alt={`${genre.name} thumbnail`}
                    />
                  ) : (
                    <EmptyState
                      title="No Thumbnail"
                      description="Upload a thumbnail"
                      icon={<FileImage className="w-12 h-12" />}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Children Genres */}
      {genre?.children && genre.children.length > 0 && (
        <Card className="glass border-border/50 shadow-xl">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FolderTree className="w-5 h-5 text-primary" />
                  Children Genres
                </CardTitle>
                <CardDescription>Sub-genres under {genre.name}</CardDescription>
              </div>
              <Badge variant="secondary">{genre.children.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {genre?.children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => handleChildClick(child.id)}
                  className="group p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left  relative"
                >
                  {
                    child?.bannerUrls && (
                      <div className="absolute inset-0 -z-1">
                        <MediaImage
                          imageUrls={child.bannerUrls}
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
                          alt={`${genre?.name} banner`}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background"></div>
                      </div>
                    )
                    //   : (
                    //   <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/40 to-background"></div>
                    // )
                  }
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {child.name}
                    </h3>
                    {/* <Badge */}
                    {/*   variant={child.isActive ? "success" : "secondary"} */}
                    {/*   size="sm" */}
                    {/* > */}
                    {/*   {child.isActive ? "Active" : "Inactive"} */}
                    {/* </Badge> */}
                  </div>
                  <p className="text-sm font-mono text-muted-foreground mb-2">
                    {child.slug}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span>Order: {child.order}</span>
                    <span>Created: {formatDate(child.createdAt)}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default GenreDetailPage;
