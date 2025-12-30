import type { User } from "@/state/auth/auth.types";
import type {
  NavItem,
  NavChildItem,
} from "@/modules/authenticated/layouts/AppSidebar/nav/nav.types";
import type { UserRole } from "@/shared/types/user.types";

/**
 * Check if user has required permissions
 * @param required - Array of required permissions
 * @param user - Current user object
 * @param requireAll - If true, user must have ALL permissions. If false, user needs ANY permission.
 * @returns true if user has required permissions
 */
export const hasRequiredPermissions = (
  required: string[],
  user: User | null,
  requireAll: boolean = false,
): boolean => {
  // No permissions required - allow access
  if (!required || required.length === 0) {
    return true;
  }

  // No user or no permissions array - deny access
  if (!user || !user.permissions) {
    return false;
  }

  // SUPER_ADMIN bypasses all permission checks
  if (user.role === "SUPER_ADMIN") {
    return true;
  }

  // Check permissions based on requireAll flag
  if (requireAll) {
    // User must have ALL required permissions (AND logic)
    return required.every((permission) =>
      user.permissions!.includes(permission),
    );
  } else {
    // User needs ANY of the required permissions (OR logic)
    return required.some((permission) =>
      user.permissions!.includes(permission),
    );
  }
};

/**
 * Check if user has required role
 * @param requiredRoles - Array of roles that can access this item
 * @param user - Current user object
 * @returns true if user has one of the required roles
 */
const hasRequiredRole = (
  requiredRoles: UserRole[],
  user: User | null,
): boolean => {
  // No role requirements - allow access
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  // No user - deny access
  if (!user || !user.role) {
    return false;
  }

  // SUPER_ADMIN bypasses all role checks
  if (user.role === "SUPER_ADMIN") {
    return true;
  }

  // Check if user's role is in the allowed list
  return requiredRoles.includes(user.role);
};

/**
 * Check if user can access a single navigation item
 * Checks both role AND permissions requirements
 * @param item - Navigation item (parent or child)
 * @param user - Current user object
 * @returns true if user has access to this nav item
 */
export const checkNavItemAccess = (
  item: NavItem | NavChildItem,
  user: User | null,
): boolean => {
  // No user - deny access (only show public items, but admin sidebar shouldn't have public items)
  if (!user) {
    return false;
  }

  // SUPER_ADMIN has access to everything
  if (user.role === "SUPER_ADMIN") {
    return true;
  }

  // Check role requirements (if specified)
  const hasRole = hasRequiredRole(item.requiredRole || [], user);
  if (!hasRole) {
    return false;
  }

  // Check permission requirements (if specified)
  const hasPermissions = hasRequiredPermissions(
    item.requiredPermissions || [],
    user,
    item.requireAllPermissions || false,
  );
  if (!hasPermissions) {
    return false;
  }

  // User passes all checks
  return true;
};

/**
 * Filter navigation items based on user's role and permissions
 * Recursively filters both parent items and their subItems
 * Removes parent items if all their children are filtered out
 * @param items - Array of navigation items
 * @param user - Current user object
 * @returns Filtered array of navigation items
 */
export const filterNavItems = (
  items: NavItem[],
  user: User | null,
): NavItem[] => {
  return items
    .map((item) => {
      // Check if user has access to parent item
      const hasParentAccess = checkNavItemAccess(item, user);

      // If parent has no access, filter it out entirely
      if (!hasParentAccess) {
        return null;
      }

      // If item has subItems, filter them recursively
      if (item.subItems && item.subItems.length > 0) {
        const filteredSubItems = item.subItems.filter((subItem) =>
          checkNavItemAccess(subItem, user),
        );

        // If all subItems are filtered out, hide the parent too
        if (filteredSubItems.length === 0) {
          return null;
        }

        // Return parent with filtered subItems
        return {
          ...item,
          subItems: filteredSubItems,
        };
      }

      // Return item as-is if it has no subItems
      return item;
    })
    .filter((item): item is NavItem => item !== null); // Remove null items and fix TypeScript type
};
