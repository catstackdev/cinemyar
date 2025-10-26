import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { AppProviders } from "@/contexts";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  initialTheme?: "light" | "dark" | "system";
}

const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions,
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <AppProviders>{children}</AppProviders>;
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

export * from "@testing-library/react";
export { customRender as render };
