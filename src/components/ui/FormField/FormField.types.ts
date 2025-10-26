import type { ReactNode } from "react";

export type FormLayout = "stacked" | "floating" | "horizontal";
export type FormSize = "sm" | "md" | "lg";
export type FormWeight = "normal" | "medium" | "semibold" | "bold";

export interface FormFieldProps {
  children: ReactNode;
  name: string;
  id?: string | undefined;
  error?: string | undefined;
  disabled?: boolean | undefined;
  layout?: FormLayout | undefined;
  labelWidth?: string | undefined;
  className?: string | undefined;
}

export interface FormFieldContextType {
  id: string | undefined;
  name: string;
  error?: string | undefined;
  disabled?: boolean | undefined;
  layout: FormLayout;
  labelWidth: string;
}

export interface FormFieldLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  required?: boolean | undefined;
  size?: FormSize | undefined;
  weight?: FormWeight | undefined;
  className?: string | undefined;
}

export interface FormFieldControlProps {
  children: ReactNode;
  className?: string | undefined;
}

export interface FormFieldErrorProps
  extends React.ComponentPropsWithoutRef<"p"> {
  children?: ReactNode;
  size?: FormSize | undefined;
  icon?: boolean | undefined;
  className?: string | undefined;
}

export interface FormFieldInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  className?: string | undefined;
}

export interface FormFieldTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
  className?: string | undefined;
}
