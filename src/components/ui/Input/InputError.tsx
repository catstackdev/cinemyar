import type { InputErrorProps } from "./Input.types";
import { FormFieldError } from "../FormField/FormFieldError";
import { useFormField } from "../FormField";

export const InputError = (props: InputErrorProps) => {
  useFormField();
  
  return <FormFieldError {...props} />;
};
