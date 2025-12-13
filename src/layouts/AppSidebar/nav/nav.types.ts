import type { UserRole } from "@/shared/types/types";
import type { ReactNode } from "react";

export type NavChildItem = {
  id: string;
  name: string;
  path?: string;
  icon?: ReactNode;

  // Add permission fields
  requiredRole?: UserRole[];
  requiredPermissions?: string[];
  requireAllPermissions?: boolean;
};
export interface NavItem {
  id: string;
  name: string;
  path?: string;
  icon: ReactNode;

  // Add permission fields
  requiredRole?: UserRole[];
  requiredPermissions?: string[];
  requireAllPermissions?: boolean;

  subItems?: NavChildItem[];
}
