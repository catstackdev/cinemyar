import type { PermissionResponseData } from "@/shared/types";

export interface RolesSidebarProps extends React.ComponentPropsWithoutRef<"aside "> {
  children?: React.ReactNode;
  className?: string;

  data: PermissionResponseData;
  activeEntity: string;
  selectedPermissions: string[];
  onEntityClick: (entityKey: string) => void;
}
