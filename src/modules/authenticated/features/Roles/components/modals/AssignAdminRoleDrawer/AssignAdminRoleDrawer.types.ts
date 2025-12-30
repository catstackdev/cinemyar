import type { AdminRole } from "@/shared/types";

export interface AssignAdminRoleDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  item: AdminRole | null;
}
