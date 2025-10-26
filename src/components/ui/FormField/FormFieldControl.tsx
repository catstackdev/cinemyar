import type { FormFieldControlProps } from "./FormField.types";
import { useFormField } from "./FormFieldContext";
import { cn } from "@/utils/helpers/classNames";

export const FormFieldControl = ({
  children,
  className,
}: FormFieldControlProps) => {
  const { layout } = useFormField();

  const isHorizontal = layout === "horizontal";

  return (
    <div className={cn(isHorizontal && "flex-1", className)}>{children}</div>
  );
};
