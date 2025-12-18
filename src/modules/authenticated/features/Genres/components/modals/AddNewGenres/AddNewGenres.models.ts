import type { FormField } from "@/types/formFields.types";

export const formFields: FormField[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "slug", label: "Slug", type: "text", required: true },
  { name: "parentId", label: "Parent", type: "select" },
  { name: "description", label: "Description", type: "textarea" },
  // { name: "active", label: "Active", type: "checkbox" },
] as const;
