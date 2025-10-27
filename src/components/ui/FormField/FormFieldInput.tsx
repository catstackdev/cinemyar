import { forwardRef } from "react";
import type { FormFieldInputProps } from "./FormField.types";
import { useFormField } from "./FormFieldContext";
import { cn } from "@/utils/helpers/classNames";

export const FormFieldInput = forwardRef<HTMLInputElement, FormFieldInputProps>(
  ({ className, type = "text", touched, dirty, ...props }, ref) => {
    const { id, name, error, disabled, layout } = useFormField();

    const isFloating = layout === "floating";
    const isHorizontal = layout === "horizontal";

    const isValidate = (touched || dirty) && !error;

    const inputStateClass = error
      ? "border-danger focus:border-danger focus:ring-danger/20"
      : isValidate
        ? "border-success-500 focus:border-success-500 focus:ring-success-500/20"
        : "border-input focus:border-primary focus:ring-primary/20";

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
          "w-full border rounded-md transition-colors peer placeholder-shown:border-input",
          "bg-background text-foreground",
          isFloating
            ? "px-3 pt-3 pb-3 placeholder:opacity-0 focus:placeholder:opacity-100"
            : "px-3 py-2 placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
          inputStateClass,
          disabled && "bg-muted cursor-not-allowed opacity-60",
          isHorizontal && "flex-1",
          className,
        )}
        placeholder={isFloating ? " " : props.placeholder}
        {...props}
      />
    );
  },
);

FormFieldInput.displayName = "FormFieldInput";
