import type { InputLabelProps } from "./Input.types";
import { FormFieldLabel } from "../FormField/FormFieldLabel";
import { useFormField } from "../FormField";

export const InputLabel = (props: InputLabelProps) => {
  useFormField();
  
  return <FormFieldLabel {...props} />;
};
