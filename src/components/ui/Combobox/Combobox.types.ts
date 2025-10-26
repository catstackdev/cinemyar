import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps extends Omit<ComponentPropsWithoutRef<"input">, "value" | "onChange"> {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  emptyMessage?: string;
  className?: string;
  renderOption?: (option: ComboboxOption) => ReactNode;
}
