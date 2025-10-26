import { type ReactNode } from "react";
import { ThemeContextProvider } from "./ThemeContext";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}
