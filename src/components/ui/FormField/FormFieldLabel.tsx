import type { FormFieldLabelProps } from "./FormField.types";
import { useFormField } from "./FormFieldContext";
import Label from "../Label";
import { cn } from "@/utils/helpers/classNames";

export const FormFieldLabel = ({
  children,
  required,
  size,
  weight,
  className,
  ...rest
}: FormFieldLabelProps) => {
  const { id, disabled, layout, labelWidth } = useFormField();

  const isFloating = layout === "floating";
  const isHorizontal = layout === "horizontal";

  if (isFloating) {
    return (
      <label
        htmlFor={id}
        className={cn(
          "absolute left-3 top-4 origin-[0] transition-all duration-200 pointer-events-none text-md z-10 rounded",
          "text-muted-foreground bg-background mx-1",
          "peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100",
          "peer-focus:top-0 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-primary",
          "peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-75",
          "peer-[:not(:placeholder-shown)]:text-foreground",
          disabled && "opacity-60",
          className,
        )}
        {...rest}
      >
        {children}
        {required && <span className="text-danger ml-1">*</span>}
      </label>
    );
  }

  if (isHorizontal) {
    return (
      <Label
        htmlFor={id}
        required={required}
        size={size}
        weight={weight}
        disabled={disabled}
        className={cn("flex-shrink-0 flex items-center", className)}
        style={{ minWidth: labelWidth }}
        {...rest}
      >
        {children}
      </Label>
    );
  }

  // Default stacked layout
  return (
    <Label
      htmlFor={id}
      required={required}
      size={size}
      weight={weight}
      disabled={disabled}
      className={className}
      {...rest}
    >
      {children}
    </Label>
  );
};
