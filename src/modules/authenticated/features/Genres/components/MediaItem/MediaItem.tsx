import React from "react";
import { cn } from "@/utils/helpers/classNames";
import styles from "./MediaItem.module.css";
import type { MediaItemProps } from "./MediaItem.types";
import { Badge, Button, Image, Stack, FormField } from "@/components/ui";
import { TrashIcon } from "lucide-react";
import { getMediaActions } from "./const";
import { GenreImageSizes } from "@/shared/types/config/media/genre/genre-image-sizes.config";
import {
  useApproveMedia,
  usePermanentDeleteMedia,
  usePublishMedia,
  useRejectMedia,
  useRollbackMedia,
} from "@/modules/domain/media/hooks/useMedia";
import { PermissionGuard, ConfirmDialog } from "@/components/common";
import { GenrePermissions } from "@/shared/types/constants";
import type { ApiMediaPostParam } from "@/modules/domain/media/api/media.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DeleteGenreSchema,
  type DeleteGenreFormData,
} from "@/schemas/movie.schema";
import { useModal } from "@/hooks";
import MediaListPreview from "../MediaListPreview";

const MediaItem: React.FC<MediaItemProps> = ({
  type, // 'icon' | 'banner' | 'thumbnail'
  item,
  entityId,
  entityType,
  children,
  className,
  ...rest
}) => {
  const action = getMediaActions(item.status);

  // Modal states
  const rejectModal = useModal<void>();
  const permDeleteModal = useModal<void>();

  // Form for reject/delete with reason
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DeleteGenreFormData>({
    resolver: zodResolver(DeleteGenreSchema),
  });

  // Media action hooks
  const { mutate: approveMedia, isPending: isApproving } = useApproveMedia();
  const { mutate: publishMedia, isPending: isPublishing } = usePublishMedia();
  const { mutate: rejectMedia, isPending: isRejecting } = useRejectMedia();
  const { mutate: rollbackMedia, isPending: isRollingBack } =
    useRollbackMedia();
  const { mutate: permDeleteMedia, isPending: isPermDeleting } =
    usePermanentDeleteMedia();

  const checkDataInValid =
    !item.version || !entityId || !entityType || !type || !item.version;

  // Handle action button click based on status
  const handleActionClick = () => {
    if (checkDataInValid) return;
    const params: Omit<ApiMediaPostParam, "action"> = {
      entityType,
      entityId,
      mediaType: "images",
      subType: type,
      version: item.version,
    };

    switch (item.status) {
      case "PENDING":
        // Approve action (PENDING → READY)
        approveMedia(params);
        break;
      case "READY":
        // Publish action (READY → ACTIVE)
        publishMedia(params);
        break;
      case "FAILED":
        // Retry/Rollback action
        rollbackMedia(params);
        break;
      case "ARCHIVED":
        // Restore action
        rollbackMedia(params);
        break;
      default:
        break;
    }
  };

  // Open reject modal
  // const handleRejectClick = () => {
  //   setIsRejectModalOpen(true);
  // };

  // Handle reject with reason
  const handleRejectSubmit = (data: DeleteGenreFormData) => {
    if (checkDataInValid) return;
    rejectMedia(
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
          rejectModal?.close();
          reset?.();
        },
      },
    );
  };

  // Open permanent delete modal
  // const handlePermanentDeleteClick = () => {
  //   setIsPermDeleteModalOpen(true);
  // };

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
    isApproving ||
    isPublishing ||
    isRejecting ||
    isRollingBack ||
    // isDeleting ||
    isPermDeleting;

  // 1. Get the size configuration based on type
  // Use optional chaining and a fallback to prevent "Cannot read properties of undefined"
  const sizeConfig = GenreImageSizes[type] ?? null;

  // 2. Add a simple guard: if the type is missing/wrong, don't render or show error
  if (!sizeConfig) return null;

  // Helper function to format dimensions text from your GenreImageSizes object
  const getDim = (s: { width: number | null; height: number | null }) =>
    s.width ? `${s.width}x${s.height}` : "Original";

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
            variant={item?.status === "READY" ? "success" : "warning"}
            size="sm"
          >
            {item?.status}
          </Badge>
        </Stack>

        <Stack direction="horizontal" spacing="xs">
          {/* Main Action Button (Approve/Publish/Retry/Restore) */}
          {action.show &&
            action.permission &&
            !action.disabled &&
            action.action && (
              <PermissionGuard permissions={action.permission}>
                <Button
                  variant="glass"
                  color={action.color}
                  size="sm"
                  leftIcon={action.icon}
                  onClick={handleActionClick}
                  disabled={isActionPending}
                  isLoading={
                    action.action === "approve"
                      ? isApproving
                      : action.action === "publish"
                        ? isPublishing
                        : isRollingBack
                  }
                >
                  {action.label}
                </Button>
              </PermissionGuard>
            )}

          {/* Status Badge (ACTIVE/PROCESSING - Non-clickable) */}
          {action.show && action.disabled && (
            <Button
              variant="glass"
              color={action.color}
              size="sm"
              leftIcon={action.icon}
              disabled={true}
            >
              {action.label}
            </Button>
          )}

          {/* Reject Button (for PENDING/READY) */}
          {(item.status === "PENDING" || item.status === "READY") && (
            <PermissionGuard permissions={GenrePermissions.REJECT}>
              <Button
                variant="glass"
                color="danger"
                size="sm"
                leftIcon={<TrashIcon size={14} />}
                onClick={() => rejectModal?.open()}
                disabled={isActionPending}
              >
                Reject
              </Button>
            </PermissionGuard>
          )}

          {/* Permanent Delete Button (for FAILED/ARCHIVED) */}
          {(item.status === "FAILED" || item.status === "ARCHIVED") && (
            <PermissionGuard permissions={GenrePermissions.DELETE_PERMANENT}>
              <Button
                variant="glass"
                color="danger"
                size="sm"
                leftIcon={<TrashIcon size={14} />}
                onClick={() => permDeleteModal?.open()}
                disabled={isActionPending}
              >
                Delete
              </Button>
            </PermissionGuard>
          )}
        </Stack>
      </Stack>

      <MediaListPreview type={type} currentImages={item?.urls} />

      {children}

      {/* Reject Modal */}
      <ConfirmDialog
        open={rejectModal.isOpen}
        onOpenChange={(open) => {
          if (!open) {
            rejectModal?.close();
            reset();
          }
        }}
        onConfirm={handleSubmit(handleRejectSubmit)}
        title="Reject Media"
        confirmText="Reject"
        cancelText="Cancel"
        variant="danger"
        isLoading={isRejecting}
      >
        <FormField.Root
          name="reason"
          layout="stacked"
          error={errors.reason?.message}
        >
          <FormField.Label required>Reason for Rejection</FormField.Label>
          <FormField.Textarea
            {...register("reason")}
            placeholder="Why is this media being rejected?"
            disabled={isSubmitting || isRejecting}
          />
          {errors.reason && (
            <FormField.Error icon>{errors.reason.message}</FormField.Error>
          )}
        </FormField.Root>
        <p className="text-sm text-muted-foreground mt-2">
          Are you sure you want to reject version {item.version} of this {type}?
        </p>
      </ConfirmDialog>

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
