import { createContext, useContext } from "react";
import type { DrawerContextValue } from "./Drawer.types";

export const DrawerContext = createContext<DrawerContextValue | null>(null);

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("Drawer compound components must be used within DrawerRoot");
  }
  return context;
};
