import type { User, UserRole } from "@/state/auth/auth.types";

/**
 * Check if user has any of the specified roles
 */
export const hasRole = (user: User | null, allowedRoles: UserRole[]): boolean => {
  if (!user || !user.role) return false;
  return allowedRoles.includes(user.role);
};

/**
 * Check if user has a specific permission
 */
export const hasPermission = (user: User | null, permission: string): boolean => {
  if (!user || !user.permissions) return false;
  return user.permissions.includes(permission);
};

/**
 * Check if user has admin privileges (admin or super-admin)
 */
export const isAdmin = (user: User | null): boolean => {
  return hasRole(user, ["admin", "super-admin"]);
};

/**
 * Check if user has super admin privileges
 */
export const isSuperAdmin = (user: User | null): boolean => {
  return hasRole(user, ["super-admin"]);
};

/**
 * Check if user can access authenticated routes (admin, translator, super-admin)
 */
export const canAccessAuthenticated = (user: User | null): boolean => {
  return hasRole(user, ["admin", "translator", "super-admin"]);
};

/**
 * Get user role display name
 */
export const getRoleDisplayName = (role: UserRole): string => {
  const roleNames: Record<UserRole, string> = {
    "user": "User",
    "translator": "Translator",
    "admin": "Administrator",
    "super-admin": "Super Administrator"
  };
  return roleNames[role] || role;
};