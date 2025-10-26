import { useRef, useEffect } from "react";
import type { CheckboxProps } from "./Checkbox.types";
import { cn } from "@/utils/helpers/classNames";
import { sizeClasses } from "./constants";

const Checkbox = ({
  label,
  size = "md",
  error,
  indeterminate = false,
  className,
  disabled,
  id,
  ...rest
}: CheckboxProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const sizeClass = sizeClasses[size];
  const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2, 11)}`;

  return (
    <div className={cn("flex items-start", className)}>
      <div className="flex items-center h-5">
        <input
          ref={checkboxRef}
          type="checkbox"
          id={checkboxId}
          disabled={disabled}
          className={cn(
            "rounded border-input text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2",
            "focus:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-danger focus:ring-danger",
            sizeClass,
          )}
          {...rest}
        />
      </div>
      {label && (
        <div className="ml-3">
          <label
            htmlFor={checkboxId}
            className={cn(
              "font-medium text-foreground",
              disabled && "opacity-50 cursor-not-allowed",
              error && "text-danger",
            )}
          >
            {label}
          </label>
          {error && <p className="mt-1 text-sm text-danger">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
