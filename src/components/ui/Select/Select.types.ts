export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options: SelectOption[];
  label?: string | undefined;
  error?: string | undefined;
  placeholder?: string | undefined;
  className?: string | undefined;
}
