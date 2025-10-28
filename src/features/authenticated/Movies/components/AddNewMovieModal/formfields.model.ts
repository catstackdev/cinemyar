import type { FormField } from "@/types/formFields.types";

export const formFields: FormField[] = [
  { name: "title", label: "Enter Movie Title", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "genre", label: "Genre", type: "text" },
  { name: "releaseYear", label: "Release Year", type: "number" },
  { name: "duration", label: "Duration (minutes)", type: "number" },
] as const;
