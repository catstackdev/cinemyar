import { FileMimeType, FileSize } from "@/shared/constants/file.const";
import { z } from "zod";
export const AddGenreSchema = z.object({
  name: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  slug: z
    .string()
    .min(1, "Slug is required")
    .lowercase()
    .trim()
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain letters, numbers, and hyphens (no spaces)",
    ),
  parentId: z.string().nullable().optional(),
});
export type AddGenreFormData = z.infer<typeof AddGenreSchema>;

export const UpdateGenreSchema = z.object({
  name: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  parentId: z.string().nullable().optional(),
  order: z.number().min(0, "Order is required"),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
});
export type UpdateGenreFormData = z.infer<typeof UpdateGenreSchema>;

export const DeleteGenreSchema = z.object({
  reason: z
    .string()
    .min(5, "Please provide a detailed reason (at least 5 characters)")
    .max(200, "Reason is too long"),
});

export type DeleteGenreFormData = z.infer<typeof DeleteGenreSchema>;

const MAX_FILE_SIZE = 5 * FileSize.MB;
const isAcceptedType = (type: string, allowed: readonly string[]) =>
  allowed.includes(type);
export const GenreMediaSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => isAcceptedType(file.type, FileMimeType.IMAGE),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});
export type GenreMediaFormData = z.infer<typeof GenreMediaSchema>;
