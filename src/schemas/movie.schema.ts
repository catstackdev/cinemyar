import { z } from "zod";
export const AddCategorySchema = z.object({
  name: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  slug: z.string().min(1, "Slug is required"),
  active: z.boolean().optional(),
});
export type AddCategoryFormData = z.infer<typeof AddCategorySchema>;
