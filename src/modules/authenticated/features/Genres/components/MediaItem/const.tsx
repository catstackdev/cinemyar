import type { MediaItem } from "@/shared/types/types/genre";
import {
  Loader2,
  Check,
  Send,
  RefreshCw,
  Archive,
  Trash2,
  AlertCircle,
  Activity,
} from "lucide-react";
import { GenrePermissions } from "@/shared/types/constants";

export type MediaActionType =
  | "approve"
  | "publish"
  | "reject"
  | "rollback"
  | "recover";

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

export const getMediaActions = (
  status: MediaItem["status"],
): MediaActionConfig => {
  switch (status) {
    case "PROCESSING":
      return {
        label: "Processing",
        color: "info" as const,
        icon: <Loader2 className="h-4 w-4 animate-spin" />,
        show: true,
        disabled: true,
        variant: "outline" as const,
      };

    case "PENDING":
      return {
        label: "Approve",
        color: "success" as const,
        icon: <Check className="h-4 w-4" />,
        show: true,
        variant: "ghost" as const,
        action: "approve",
        permission: GenrePermissions.APPROVE,
      };

    case "READY":
      return {
        label: "Publish",
        color: "primary" as const,
        icon: <Send className="h-4 w-4" />,
        show: true,
        variant: "ghost" as const,
        action: "publish",
        permission: GenrePermissions.PUBLISH,
      };

    case "ACTIVE": // now Published
      return {
        label: "Active",
        color: "success" as const,
        icon: <Activity className="h-4 w-4" />,
        show: true,
        disabled: true,
        variant: "subtle" as const, // Or keep ghost
      };

    case "FAILED": // TODO: BE need action .. think about it
      return {
        label: "Retry",
        color: "danger" as const,
        icon: <RefreshCw className="h-4 w-4" />,
        show: true,
        variant: "ghost" as const,
        // action: // no action "rollback",
        permission: GenrePermissions.UPLOAD,
      };

    case "ARCHIVED":
      return {
        label: "Restore",
        color: "secondary" as const,
        icon: <Archive className="h-4 w-4" />,
        show: true,
        variant: "ghost" as const,
        action: "rollback",
        permission: GenrePermissions.UPLOAD,
      };

    case "DELETED":
      return {
        label: "Deleted",
        color: "danger" as const,
        icon: <Trash2 className="h-4 w-4" />,
        show: true,
        disabled: true,
        variant: "outline" as const,
      };

    default:
      return {
        label: "Unknown",
        icon: <AlertCircle className="h-4 w-4" />,
        show: false,
      };
  }
};
