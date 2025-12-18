import type { UserRole } from "@/types";

export interface CanOptions {
  roles?: UserRole[];
  permissions?: string | string[];
  requireAll?: boolean;
}
