import type { InputRootProps } from "./Input.types";
import { FormField } from "../FormField";

export const InputRoot = ({
  children,
  name,
  error,
  disabled,
  layout = "stacked",
  labelWidth = "120px",
  className,
}: InputRootProps) => {
  return (
    <FormField
      name={name}
      error={error}
      disabled={disabled}
      layout={layout}
      labelWidth={labelWidth}
      className={className}
    >
      {children}
    </FormField>
  );
};
