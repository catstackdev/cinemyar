import type { User, UserRole } from "@/state/auth/auth.types";

/**
 * Check if user has any of the specified roles
 */
export const hasRole = (
  user: User | null,
  allowedRoles: UserRole[],
): boolean => {
  if (!user || !user.role) return false;
  return allowedRoles.includes(user.role);
};

/**
 * Check if user has a specific permission
 */
export const hasPermission = (
  user: User | null,
  permission: string,
): boolean => {
  if (!user || !user.permissions) return false;
  return user.permissions.includes(permission);
};

/**
 * Check if user has admin privileges (admin or super-admin)
 */
export const isAdmin = (user: User | null): boolean => {
  return hasRole(user, ["ADMIN", "SUPER_ADMIN"]);
};

/**
 * Check if user has super admin privileges
 */
export const isSuperAdmin = (user: User | null): boolean => {
  return hasRole(user, ["SUPER_ADMIN"]);
};

/**
 * Check if user can access authenticated routes (admin or super-admin)
 */
export const canAccessAuthenticated = (user: User | null): boolean => {
  return hasRole(user, ["ADMIN", "SUPER_ADMIN"]);
};

/**
 * Get user role display name
 */
export const getRoleDisplayName = (role: UserRole): string => {
  const roleNames: Record<UserRole, string> = {
    USER: "User",
    PREMIUM: "Premium User",
    ADMIN: "Administrator",
    SUPER_ADMIN: "Super Administrator",
  };
  return roleNames[role] || role;
};
