import type { ComponentPropsWithoutRef } from "react";

export interface DatePickerProps extends Omit<ComponentPropsWithoutRef<"input">, "value" | "onChange"> {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
  className?: string;
}
