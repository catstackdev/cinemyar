import type { ReactNode, InputHTMLAttributes } from "react";

export type InputLayout = "stacked" | "floating" | "horizontal";

export interface InputRootProps {
  children: ReactNode;
  name: string;
  error?: string | undefined;
  disabled?: boolean | undefined;
  layout?: InputLayout | undefined;
  labelWidth?: string | undefined;
  className?: string | undefined;
}

export interface InputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  className?: string;
}

export interface InputLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  required?: boolean | undefined;
  size?: "sm" | "md" | "lg" | undefined;
  weight?: "normal" | "medium" | "semibold" | "bold" | undefined;
  className?: string | undefined;
}

export interface InputErrorProps extends React.ComponentPropsWithoutRef<"p"> {
  children?: ReactNode;
  size?: "sm" | "md" | "lg" | undefined;
  icon?: boolean | undefined;
  className?: string | undefined;
}
