import type { MediaItem } from "@/shared/types/genre";
import { Check, Send, Archive, AlertCircle, Activity } from "lucide-react";
import { GenreImageType, GenrePermissions } from "@/shared/constants";
import type { JSX } from "react";

export type MediaActionType =
  | "publish"
  | "unpublish"
  | "recover"
  | "delete"
  | "permanentDelete"
  | "regenerate"
  | "errorReport"; // Future improvement

export interface MediaActionConfig {
  label: string;
  color: "info" | "success" | "primary" | "danger" | "secondary" | "warning";
  icon: JSX.Element;
  show: boolean;
  disabled?: boolean;
  variant?: "outline" | "ghost" | "subtle";
  action?: MediaActionType;
  permission?: string;
}

const commonActions: Record<string, MediaActionConfig> = {
  regenerate: {
    label: "Regenerate",
    color: "info",
    icon: <Activity className="h-4 w-4" />,
    show: true,
    variant: "ghost",
    action: "regenerate",
    permission: GenrePermissions.PUBLISH,
  },
  rollback: {
    label: "Unpublish",
    color: "warning",
    icon: <Archive className="h-4 w-4" />,
    show: true,
    variant: "ghost",
    action: "unpublish",
    permission: GenrePermissions.PUBLISH,
  },
  recover: {
    label: "Recover",
    color: "success",
    icon: <Check className="h-4 w-4" />,
    show: true,
    variant: "ghost",
    action: "recover",
    permission: GenrePermissions.PUBLISH,
  },
  delete: {
    label: "Delete",
    color: "secondary",
    icon: <Archive className="h-4 w-4" />,
    show: true,
    variant: "ghost",
    action: "delete",
    permission: GenrePermissions.UPLOAD,
  },
  permanentDelete: {
    label: "Permanent Delete",
    color: "danger",
    icon: <AlertCircle className="h-4 w-4" />,
    show: true,
    variant: "ghost",
    action: "permanentDelete",
    permission: GenrePermissions.DELETE,
  },
};

export const getMediaActions = (
  status: MediaItem["status"],
): MediaActionConfig[] => {
  switch (status) {
    case "DRAFT":
      return [
        {
          label: "Publish",
          color: "primary",
          icon: <Send className="h-4 w-4" />,
          show: true,
          variant: "ghost",
          action: "publish",
          permission: GenrePermissions.PUBLISH,
        },
        commonActions.regenerate,
        commonActions.delete,
        commonActions.permanentDelete,
      ];

    case "PUBLISHED":
      return [
        commonActions.regenerate,
        commonActions.rollback,
        commonActions.permanentDelete,
      ];

    case "ARCHIVED":
      return [commonActions.recover, commonActions.permanentDelete];

    default:
      return [];
  }
};
