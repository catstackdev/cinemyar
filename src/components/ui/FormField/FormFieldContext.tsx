import { createContext, useContext } from "react";
import type { FormFieldContextType } from "./FormField.types";

export const FormFieldContext = createContext<
  FormFieldContextType | undefined
>(undefined);

export function useFormField() {
  const context = useContext(FormFieldContext);

  if (context === undefined) {
    throw new Error("useFormField must be used within FormField");
  }

  return context;
}
