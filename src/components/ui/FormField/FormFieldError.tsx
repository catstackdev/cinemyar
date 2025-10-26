import type { FormFieldErrorProps } from "./FormField.types";
import { useFormField } from "./FormFieldContext";
import ErrorMessage from "../ErrorMessage";

export const FormFieldError = ({
  children,
  size,
  icon,
  className,
  ...rest
}: FormFieldErrorProps) => {
  const { id, error } = useFormField();

  const content = children || error;

  if (!content) return null;

  return (
    <ErrorMessage
      id={`${id}-error`}
      size={size}
      variant="error"
      icon={icon}
      className={className}
      {...rest}
    >
      {content}
    </ErrorMessage>
  );
};
