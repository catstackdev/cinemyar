import type { Category } from "@/api/categories.api";

export interface UpdateCategoryProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  category: Category;
}
