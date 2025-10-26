import { useContext } from "react";
import { InputContext } from "./context";

export function useInputContext() {
  const context = useContext(InputContext);

  if (context === undefined) {
    throw new Error("useInputContext must be used within Input.Root");
  }

  return context;
}
