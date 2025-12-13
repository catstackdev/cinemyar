import type { ReactNode } from "react";
import type { UserRole } from "@/state/auth";

export interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
  fallback?: ReactNode;
  requireAuth?: boolean;
  allowedRoles?: UserRole[];
}
