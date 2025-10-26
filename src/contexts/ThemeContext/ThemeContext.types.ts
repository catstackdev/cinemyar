export type ThemeState = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: ThemeState;
  actualTheme: "light" | "dark";
  setTheme: (theme: ThemeState) => void;
}
