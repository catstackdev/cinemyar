import type { FormField } from "@/types/formFields.types";

export const formFields: FormField[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "slug", label: "Slug", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "active", label: "Active", type: "checkbox" },
] as const;
