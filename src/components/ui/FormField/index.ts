import { FormField as FormFieldRoot } from "./FormField";
import { FormFieldLabel } from "./FormFieldLabel";
import { FormFieldControl } from "./FormFieldControl";
import { FormFieldError } from "./FormFieldError";
import { FormFieldInput } from "./FormFieldInput";
import { FormFieldTextarea } from "./FormFieldTextarea";

export const FormField = Object.assign(FormFieldRoot, {
  Root: FormFieldRoot,
  Label: FormFieldLabel,
  Control: FormFieldControl,
  Input: FormFieldInput,
  Textarea: FormFieldTextarea,
  Error: FormFieldError,
});

export { useFormField } from "./FormFieldContext";
export type * from "./FormField.types";
