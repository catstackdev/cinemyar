import type { User } from "@/state/auth";
import { hasPermissions, hasRole } from "../../permissions";
import type { CanOptions } from "./can.types";

export const can = (user: User | null, options: CanOptions): boolean => {
  if (!user) return false;

  if (options.roles && !hasRole(user, options.roles)) {
    return false;
  }

  if (options.permissions) {
    return hasPermissions(user, options.permissions, options.requireAll);
  }
  return true;
};
