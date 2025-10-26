import { createContext } from "react";
import { type InputContextType } from "./InputContext.types";

export const InputContext = createContext<InputContextType | undefined>(
  undefined,
);

