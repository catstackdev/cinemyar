import type { ReactNode } from "react";
import { useCan } from "@/hooks/useCan";
import type { UserRole } from "@/types";

export interface PermissionGuardProps {
  children: ReactNode;
  roles?: UserRole[];
  permissions?: string | string[];
  fallback?: ReactNode;
  requireAll?: boolean;
}

/**
 * Wrapper component for permission-based rendering
 *
 * @example
 * <PermissionGuard permissions={GENRE_PERMISSIONS.CREATE} roles={["ADMIN"]}>
 *   <AddNewGenres />
 * </PermissionGuard>
 */
export const PermissionGuard = ({
  children,
  roles,
  permissions,
  fallback = null,
  requireAll = false,
}: PermissionGuardProps) => {
  const hasPermission = useCan({ roles, permissions, requireAll });

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
