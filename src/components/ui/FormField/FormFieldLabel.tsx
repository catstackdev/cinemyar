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
          // Base floating label styles
          "absolute left-3 top-4 origin-[0_0] transition-all duration-200 pointer-events-none",
          "text-muted-foreground bg-background px-1 z-10",

          // Animation classes for floating behavior
          "peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary",
          "peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-[&:not(:placeholder-shown)]:scale-75",
          "peer-[&:not(:placeholder-shown)]:text-foreground",

          // Error state
          "peer-aria-[invalid=true]:text-danger",

          // Disabled state
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
