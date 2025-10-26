import { forwardRef, useState } from "react";
import type { DatePickerProps } from "./DatePicker.types";
import { cn } from "@/utils/helpers/classNames";
import { formatDate } from "./utils";

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      minDate,
      maxDate,
      disabled = false,
      error = false,
      placeholder = "Select date",
      className,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(value ? formatDate(value) : "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const dateValue = e.target.value ? new Date(e.target.value) : null;
      setInputValue(e.target.value);
      onChange?.(dateValue);
    };

    const minDateStr = minDate ? formatDate(minDate) : undefined;
    const maxDateStr = maxDate ? formatDate(maxDate) : undefined;

    return (
      <input
        ref={ref}
        type="date"
        value={inputValue}
        onChange={handleChange}
        min={minDateStr}
        max={maxDateStr}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-md border px-3 py-2 text-sm transition-colors",
          "placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 hover:border-gray-400",
          className,
        )}
        {...props}
      />
    );
  },
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
