import React from "react";
import { cn } from "@/utils/helpers/classNames";
import styles from "./MediaItem.module.css";
import type { MediaItemProps } from "./MediaItem.types";
import { Badge, Button, Stack, FormField, Progress } from "@/components/ui";
import { getMediaActions, type MediaActionType } from "./const";
import { GenreImageSizes } from "@/shared/config/media/genre/genre-image-sizes.config";
import {
  usePermanentDeleteMedia,
  usePublishMedia,
  useMediaRegenerate,
  refreshQueryClient,
  useUnpublishMedia,
  useRecoverMedia,
  useSofDeleteMedia,
} from "@/modules/domain/media/hooks/useMedia";
import { PermissionGuard, ConfirmDialog } from "@/components/common";
import type { ApiMediaPostParam } from "@/modules/domain/media/api/media.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DeleteGenreSchema,
  type DeleteGenreFormData,
} from "@/schemas/movie.schema";
import { useModal } from "@/hooks";
import MediaListPreview from "../MediaListPreview";
import { queryClient } from "@/contexts/AppProviders";

const MediaItem: React.FC<MediaItemProps> = ({
  type, // 'icon' | 'banner' | 'thumbnail'
  item,
  entityId,
  entityType,
  children,
  className,
  ...rest
}) => {
  const actions = getMediaActions(item.status);

  // Modal states
  const permDeleteModal = useModal<void>();

  // Form for delete with reason
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DeleteGenreFormData>({
    resolver: zodResolver(DeleteGenreSchema),
  });

  // Media action hooks
  const { mutate: publishMedia, isPending: isPublishing } = usePublishMedia();
  const { mutate: unpublishMedia, isPending: isUnpublishing } =
    useUnpublishMedia();
  const { mutate: permDeleteMedia, isPending: isPermDeleting } =
    usePermanentDeleteMedia();
  const { mutate: deleteMedia, isPending: isDeleting } = useSofDeleteMedia();
  const { mutate: recoverMedia, isPending: isRecovering } = useRecoverMedia();

  // Regenerate hook with job progress tracking
  const {
    regenerate,
    isRegenerating,
    progress: regenerateProgress,
    jobProgress,
    currentStep,
    jobMessage,
  } = useMediaRegenerate({
    mode: "sse",
    onComplete: () => {
      console.log("[MediaItem] Regeneration completed!");
      return refreshQueryClient(queryClient, entityType, entityId, true);
    },
    onError: (event) => {
      console.error("[MediaItem] Regeneration failed:", event.message);
    },
    onProgress: (event) => {
      console.log(
        "[MediaItem] Progress update:",
        event.progress,
        "%",
        event.step,
      );
    },
  });

  const checkDataInValid =
    !item.version || !entityId || !entityType || !type || !item.version;

  // Handle action button click based on status
  const handleActionClick = (action?: MediaActionType) => {
    if (checkDataInValid || !action) return;

    const params: Omit<ApiMediaPostParam, "action"> = {
      entityType,
      entityId,
      mediaType: "images",
      subType: type,
      version: item.version,
    };

    switch (action) {
      case "publish":
        publishMedia(params);
        break;

      case "unpublish":
        unpublishMedia(params);
        break;

      case "recover":
        recoverMedia(params);
        // TODO: implement recover hook
        break;

      case "delete":
        deleteMedia(params);
        // TODO: implement soft delete modal
        break;

      case "permanentDelete":
        permDeleteModal?.open();
        break;

      case "regenerate":
        regenerate({
          entityType,
          entityId,
          mediaType: "images",
          subType: type,
          version: item.version,
        });
        break;

      case "errorReport":
        // TODO: Future improvement - error reporting
        break;

      default:
        break;
    }
  };

  // Handle permanent delete with reason
  const handlePermanentDeleteSubmit = (data: DeleteGenreFormData) => {
    if (checkDataInValid) return;
    permDeleteMedia(
      {
        entityType,
        entityId,
        mediaType: "images",
        subType: type,
        version: item.version,
        reason: data.reason,
      },
      {
        onSuccess: () => {
          permDeleteModal?.close();
          reset();
        },
      },
    );
  };

  const isActionPending =
    isPublishing ||
    isUnpublishing ||
    isRegenerating ||
    isPermDeleting ||
    isDeleting ||
    isRecovering;

  // 1. Get the size configuration based on type
  // Use optional chaining and a fallback to prevent "Cannot read properties of undefined"
  // Convert type to lowercase to match GenreImageSizes keys (e.g., "ICON" -> "icon")
  const normalizedType = type.toLowerCase() as "icon" | "banner" | "thumbnail";
  const sizeConfig = GenreImageSizes[normalizedType] ?? null;

  // 2. Add a simple guard: if the type is missing/wrong, don't render or show error
  if (!sizeConfig) return null;

  // Helper function to format dimensions text from your GenreImageSizes object
  // const getDim = (s: { width: number | null; height: number | null }) =>
  //   s.width ? `${s.width}x${s.height}` : "Original";

  return (
    <div
      className={cn(
        styles.root,
        "p-4 bg-muted/30 rounded-lg border border-border",
        className,
      )}
      {...rest}
    >
      <Stack
        direction="horizontal"
        spacing="sm"
        justify="between"
        align="center"
        className="mb-6"
      >
        <Stack direction="horizontal" spacing="sm" align="center">
          <p className="text-xs font-medium">v{item?.version}</p>
          <Badge
            variant={item?.status === "PUBLISHED" ? "success" : "warning"}
            size="sm"
          >
            {item?.status}
          </Badge>
        </Stack>

        <Stack direction="horizontal" spacing="xs">
          {/* Main Action Button (Approve/Publish/Retry/Restore) */}
          {actions.map((action) =>
            action.show ? (
              action.permission ? (
                <PermissionGuard
                  key={action.label}
                  permissions={action.permission}
                >
                  <Button
                    variant="glass"
                    color={action.color}
                    size="sm"
                    leftIcon={action.icon}
                    disabled={isActionPending || !!action.disabled}
                    isLoading={
                      action.action === "publish"
                        ? isPublishing
                        : action.action === "unpublish"
                          ? isUnpublishing
                          : action.action === "permanentDelete"
                            ? isPermDeleting
                            : action.action === "regenerate"
                              ? isRegenerating
                              : action.action === "recover"
                                ? isRecovering
                                : action.action === "delete"
                                  ? isDeleting
                                  : false
                    }
                    onClick={() => handleActionClick(action.action)}
                  >
                    {action.label}
                  </Button>
                </PermissionGuard>
              ) : (
                <Button
                  key={action.label}
                  variant="glass"
                  color={action.color}
                  size="sm"
                  leftIcon={action.icon}
                  disabled
                >
                  {action.label}
                </Button>
              )
            ) : null,
          )}
        </Stack>
      </Stack>
      <MediaListPreview type={type} currentImages={item?.urls} />
      {/* Regeneration Progress */}
      {isRegenerating && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {currentStep || "Regenerating..."}
            </span>
            <span className="font-medium text-foreground">
              {regenerateProgress}%
            </span>
          </div>
          <Progress
            value={regenerateProgress}
            max={100}
            variant="success"
            size="md"
          />
          {jobMessage && (
            <p className="text-xs text-muted-foreground">{jobMessage}</p>
          )}
        </div>
      )}
      {children}
      {/* Permanent Delete Modal */}
      <ConfirmDialog
        open={permDeleteModal.isOpen}
        onOpenChange={(open) => {
          if (!open) {
            permDeleteModal?.close();
            reset();
          }
        }}
        onConfirm={handleSubmit(handlePermanentDeleteSubmit)}
        title="Permanent Delete Media"
        confirmText="Delete Permanently"
        cancelText="Cancel"
        variant="danger"
        isLoading={isPermDeleting}
      >
        <FormField.Root
          name="reason"
          layout="stacked"
          error={errors.reason?.message}
        >
          <FormField.Label required>Reason for Deletion</FormField.Label>
          <FormField.Textarea
            {...register("reason")}
            placeholder="Why is this media being permanently deleted?"
            disabled={isSubmitting || isPermDeleting}
          />
          {errors.reason && (
            <FormField.Error icon>{errors.reason.message}</FormField.Error>
          )}
        </FormField.Root>
        <p className="text-sm text-danger mt-2 font-semibold">
          ⚠️ Warning: This action cannot be undone! Version {item.version} of
          this {type} will be permanently removed from storage.
        </p>
      </ConfirmDialog>
    </div>
  );
};

export default MediaItem;
