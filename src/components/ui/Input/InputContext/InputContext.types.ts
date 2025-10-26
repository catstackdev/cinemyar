export interface InputContextType {
  name: string;
  error?: string | undefined;
  disabled?: boolean | undefined;
  layout?: "stacked" | "floating" | "horizontal" | undefined;
  labelWidth?: string | undefined;
}
