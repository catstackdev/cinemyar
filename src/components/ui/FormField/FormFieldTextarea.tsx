import { forwardRef } from "react";
import type { FormFieldTextareaProps } from "./FormField.types";
import { useFormField } from "./FormFieldContext";
import { cn } from "@/utils/helpers/classNames";

export const FormFieldTextarea = forwardRef<
  HTMLTextAreaElement,
  FormFieldTextareaProps
>(({ className, ...props }, ref) => {
  const { id, name, error, disabled } = useFormField();

  // const isHorizontal = layout === "horizontal";

  return (
    <textarea
      ref={ref}
      name={name}
      id={id}
      disabled={disabled}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
      className={cn(
        // Base styles
        "w-full border rounded-md transition-colors resize-y",
        "bg-background text-foreground placeholder:text-muted-foreground",

        // Padding
        "px-3 py-2",

        // Focus styles
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",

        // State-dependent styles
        error
          ? "border-danger focus:border-danger focus:ring-danger/20"
          : "border-input focus:border-primary focus:ring-primary/20",

        // Disabled styles
        disabled && "bg-muted cursor-not-allowed opacity-60",

        // Horizontal layout specific
        // isHorizontal && "flex-1",

        className,
      )}
      {...props}
    />
  );
});

FormFieldTextarea.displayName = "FormFieldTextarea";
