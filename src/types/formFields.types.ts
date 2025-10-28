export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "email"
    | "password"
    | "select"
    | "file"
    | "checkbox"
    | "radio"
    | "date";
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number | boolean;
  options?: { label: string; value: string | number }[]; // for select/radio
  accept?: string; // for file inputs (e.g., "image/*,video/*")
  min?: number;
  max?: number;
  step?: number;
  rows?: number; // for textarea
  multiple?: boolean; // for file or select
  helperText?: string;
}
