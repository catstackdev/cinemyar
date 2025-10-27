import { type ReactNode } from "react";
import { ThemeContextProvider } from "./ThemeContext";
import { AppWrapper } from "@/components/common/AppWrapper";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeContextProvider>
      <AppWrapper>{children}</AppWrapper>
    </ThemeContextProvider>
  );
}
