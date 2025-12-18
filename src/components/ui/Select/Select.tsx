import type { SelectProps } from "./Select.types";
import { cn } from "@/utils/helpers/classNames";

const Select = ({
  options,
  label,
  error,
  placeholder,
  className,
  id,
  disabled,
  ...rest
}: SelectProps) => {
  const selectId = id || `select-${Math.random().toString(36).slice(2, 11)}`;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-foreground mb-1"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        disabled={disabled}
        className={cn(
          "block w-full rounded-md border px-3 py-2 text-sm",
          "bg-background",
          "border-input",
          "text-foreground",
          "focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "focus:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-danger focus:border-danger focus:ring-danger",
        )}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
};

export default Select;
