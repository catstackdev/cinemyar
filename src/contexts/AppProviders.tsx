import { type ReactNode } from "react";
import { ThemeContextProvider } from "./ThemeContext";
import { SidebarProvider } from "./SidebarContext";
import { AppWrapper } from "@/components/common/AppWrapper";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeContextProvider>
      <AppWrapper>
        <SidebarProvider>{children}</SidebarProvider>
      </AppWrapper>
    </ThemeContextProvider>
  );
}
