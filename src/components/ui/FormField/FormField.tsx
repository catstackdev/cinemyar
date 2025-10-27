import { useId } from "react";
import type { FormFieldContextType, FormFieldProps } from "./FormField.types";
import { FormFieldContext } from "./FormFieldContext";
import { cn } from "@/utils/helpers/classNames";

export const FormField = ({
  children,
  name,
  error,
  disabled,
  layout = "stacked",
  labelWidth = "120px",
  id,
  className,
}: FormFieldProps) => {
  const generatedId = useId();
  const fieldId = id ? `${name}-${id}` : `${name}-${generatedId}`;
  const contextValue: FormFieldContextType = {
    id: fieldId,
    name,
    error,
    disabled,
    layout,
    labelWidth,
  };

  const containerClasses = cn(
    layout === "stacked" && "space-y-1.5",
    layout === "floating" && "relative space-y-1.5",
    layout === "horizontal" && "flex items-start gap-4",
    className,
  );

  return (
    <FormFieldContext.Provider value={contextValue}>
      <div className={containerClasses}>{children}</div>
    </FormFieldContext.Provider>
  );
};
