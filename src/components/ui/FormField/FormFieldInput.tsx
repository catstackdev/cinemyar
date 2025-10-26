import { forwardRef } from "react";
import type { FormFieldInputProps } from "./FormField.types";
import { useFormField } from "./FormFieldContext";
import { cn } from "@/utils/helpers/classNames";

export const FormFieldInput = forwardRef<HTMLInputElement, FormFieldInputProps>(
  ({ className, type = "text", ...props }, ref) => {
    const { id, name, error, disabled, layout } = useFormField();

    const isFloating = layout === "floating";
    const isHorizontal = layout === "horizontal";

    return (
      <input
        ref={ref}
        type={type}
        name={name}
        id={id}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          // Base styles
          "w-full border rounded-md transition-colors peer",
          "bg-background text-foreground placeholder:text-muted-foreground",

          // Layout-specific padding
          isFloating ? "px-3 pt-6 pb-2" : "px-3 py-2",

          // Focus styles
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",

          // State-dependent styles
          error
            ? "border-danger focus:border-danger focus:ring-danger/20"
            : "border-input focus:border-primary focus:ring-primary/20",

          // Disabled styles
          disabled && "bg-muted cursor-not-allowed opacity-60",

          // Horizontal layout specific
          isHorizontal && "flex-1",

          className,
        )}
        // For floating labels, use space as placeholder to trigger :not(:placeholder-shown)
        placeholder={isFloating ? " " : props.placeholder}
        {...props}
      />
    );
  },
);

FormFieldInput.displayName = "FormFieldInput";
