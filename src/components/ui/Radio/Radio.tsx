import type { RadioProps } from "./Radio.types";
import { cn } from "@/utils/helpers/classNames";
import { sizeClasses } from "./constants";

const Radio = ({
  label,
  size = "md",
  error,
  description,
  className,
  disabled,
  id,
  labelClass,
  ...rest
}: RadioProps) => {
  const sizeClass = sizeClasses[size];
  const radioId = id || `radio-${Math.random().toString(36).slice(2, 11)}`;

  return (
    <div className={cn("flex items-start", className)}>
      <div className="flex items-center h-5">
        <input
          type="radio"
          id={radioId}
          disabled={disabled}
          className={cn(
            "border-input text-primary ",
            "focus:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-danger focus:ring-danger",
            sizeClass,
          )}
          {...rest}
        />
      </div>
      {(label || description) && (
        <div className={cn("ml-3", labelClass)}>
          {label && (
            <label
              htmlFor={radioId}
              className={cn(
                "block text-sm font-medium ",
                disabled && "opacity-50 cursor-not-allowed",
                error && "text-danger",
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p
              className={cn(
                "text-sm text-muted-foreground",
                disabled && "opacity-50",
              )}
            >
              {description}
            </p>
          )}
          {error && <p className="mt-1 text-sm text-danger">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Radio;
