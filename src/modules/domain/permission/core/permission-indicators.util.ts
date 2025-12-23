import type { PermissionResponseData } from "@/shared/types/types";

/**
 * Permission indicator utility for displaying permission badges
 */

export interface PermissionIndicator {
  entity: string;
  shortCode: string;
  label: string;
  icon: string;
  count: number;
  totalActions: number;
  permissions: string[];
  hasWildcard: boolean;
}

/**
 * Checks if a permission string is a wildcard (e.g., 'movie.*')
 */
export const isWildcardPermission = (permission: string): boolean => {
  return permission.endsWith(".*");
};

/**
 * Extracts entity from permission string (e.g., 'movie.view' -> 'movie')
 */
export const getEntityFromPermission = (permission: string): string => {
  const entity = permission.split(".")[0];
  return entity ?? "";
};

/**
 * Groups permissions by entity and creates indicators
 * @param permissions - Array of permission strings (e.g., ['movie.view', 'movie.edit', 'user.*'])
 * @param permissionData - Permission metadata from API
 * @returns Array of permission indicators grouped by entity
 */
export const groupPermissionsByEntity = (
  permissions: string[],
  permissionData: PermissionResponseData | undefined,
): PermissionIndicator[] => {
  if (!permissionData || !permissions || permissions.length === 0) {
    return [];
  }

  const entityMap = new Map<string, PermissionIndicator>();

  permissions.forEach((permission) => {
    const isWildcard = isWildcardPermission(permission);
    const entity = getEntityFromPermission(permission);
    const entityData = permissionData.permissions[entity];

    if (!entityData) return;

    if (!entityMap.has(entity)) {
      entityMap.set(entity, {
        entity,
        shortCode: entityData.shortCode,
        label: entityData.label,
        icon: entityData.icon,
        count: 0,
        totalActions: entityData.actions.length,
        permissions: [],
        hasWildcard: false,
      });
    }

    const indicator = entityMap.get(entity)!;

    if (isWildcard) {
      indicator.hasWildcard = true;
      indicator.count = entityData.actions.length;
      indicator.permissions = entityData.actions.map(
        (a) => `${entity}.${a.key}`,
      );
    } else {
      indicator.permissions.push(permission);
      indicator.count = indicator.hasWildcard
        ? entityData.actions.length
        : indicator.permissions.length;
    }
  });

  return Array.from(entityMap.values()).sort((a, b) =>
    a.label.localeCompare(b.label),
  );
};

/**
 * Gets detailed permission actions for an entity
 * @param entity - Entity name (e.g., 'movie')
 * @param permissions - User's permissions
 * @param permissionData - Permission metadata from API
 */
export const getEntityPermissionDetails = (
  entity: string,
  permissions: string[],
  permissionData: PermissionResponseData | undefined,
): {
  action: string;
  label: string;
  description: string;
  granted: boolean;
}[] => {
  if (!permissionData) return [];

  const entityData = permissionData.permissions[entity];
  if (!entityData) return [];

  const hasWildcard = permissions.includes(`${entity}.*`);

  return entityData.actions.map((action) => {
    const permissionKey = `${action.key}`;
    return {
      action: action.key,
      label: action.label,
      description: action.description,
      granted: hasWildcard || permissions.includes(permissionKey),
    };
  });
};

/**
 * Formats permission count display (e.g., "3/5" or "ALL")
 */
export const formatPermissionCount = (
  indicator: PermissionIndicator,
): string => {
  if (indicator.hasWildcard) {
    return "ALL";
  }
  return `${indicator.count}/${indicator.totalActions}`;
};

/**
 * Determines badge variant based on permission coverage
 */
export const getPermissionBadgeVariant = (
  indicator: PermissionIndicator,
): "default" | "primary" | "success" | "warning" | "danger" | "info" => {
  if (indicator.hasWildcard) {
    return "success";
  }

  const percentage = (indicator.count / indicator.totalActions) * 100;

  if (percentage === 100) return "success";
  if (percentage >= 75) return "primary";
  if (percentage >= 50) return "info";
  if (percentage >= 25) return "warning";
  return "default";
};
