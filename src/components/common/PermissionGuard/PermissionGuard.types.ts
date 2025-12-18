import type { UserRole } from "@/types";
import type { ReactNode } from "react";

export interface PermissionGuardProps {
  children: ReactNode;
  roles?: UserRole[];
  permissions?: string | string[];
  fallback?: ReactNode;
  requireAll?: boolean;
}
