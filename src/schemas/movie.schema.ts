import { z } from "zod";
export const AddGenreSchema = z.object({
  name: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  slug: z.string().min(1, "Slug is required"),
  parentId: z.any(),
});
export type AddGenreFormData = z.infer<typeof AddGenreSchema>;

export const UpdateGenreSchema = z.object({
  name: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  parentId: z.any(),
  order: z.number().min(0, "Order is required"),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
});
export type UpdateGenreFormData = z.infer<typeof UpdateGenreSchema>;
