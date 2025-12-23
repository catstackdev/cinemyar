import { z } from "zod";

/**
 * 1. Define the specific Permission Keys
 * This can be expanded to include all 14 modules.
 * Using z.enum ensures autocomplete and validation.
 */
export const PermissionKeySchema = z.string().regex(
  // Allows entity.action, entity.action.sub, and entity.*
  /^[a-z_]+(\.[a-z_]+)*(\.\*)?$/,
  "Permission must follow 'entity.action', 'entity.sub.action' or 'entity.*' format",
);

/**
 * 2. Define the Role Template Schema
 */
export const AdminCreateRoleSchema = z.object({
  name: z
    .string()
    .min(3, "Internal name must be at least 3 characters")
    .regex(/^[a-z_]+$/, "Internal name must be snake_case"),

  displayName: z
    .string()
    .min(1, "Display name is required")
    .max(50, "Display name is too long"),

  description: z.string().max(255, "Description is too long").optional(),

  permissions: z
    .array(PermissionKeySchema)
    .min(1, "At least one permission must be selected"),
});

// Extract types for TypeScript
export type AdminCreateRoleFormData = z.infer<typeof AdminCreateRoleSchema>;
export type PermissionKey = z.infer<typeof PermissionKeySchema>;
