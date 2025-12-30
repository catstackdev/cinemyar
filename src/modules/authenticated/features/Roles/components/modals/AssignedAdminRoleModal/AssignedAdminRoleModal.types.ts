import type { AdminRole } from "@/shared/types";

export interface AssignedAdminRoleModalProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
  className?: string;

  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  item: AdminRole | null;
}
