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
          "absolute left-2.5 top-0 -translate-y-1/2 origin-[0] transition-all duration-200 pointer-events-none text-sm font-medium z-10",
          "px-2 bg-card rounded-sm",
          "text-muted-foreground",
          // Empty state - label in center
          "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal",
          // Focus state - label on border with color
          "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:scale-100 peer-focus:text-sm peer-focus:text-primary peer-focus:font-semibold",
          // Filled state - label on border
          "peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:scale-100 peer-[:not(:placeholder-shown)]:text-sm",
          "peer-[:not(:placeholder-shown)]:text-foreground peer-[:not(:placeholder-shown)]:font-medium",
          // Hover state - when input is hovered
          "peer-hover:text-foreground/80",
          // Disabled state
          disabled && "opacity-60 peer-disabled:opacity-60",
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
