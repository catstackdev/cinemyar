import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext } from "./context";
import type { ThemeState } from "./ThemeContext.types";

interface ThemeProviderProps {
  children: ReactNode;
}
export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeState>(() => {
    const stored = localStorage.getItem("theme") as ThemeState;
    return stored || "system";
  });

  const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove existing theme classes
    root.classList.remove("light", "dark");

    // Determine actual theme
    let effectiveTheme: "light" | "dark";

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      effectiveTheme = systemTheme;
    } else {
      effectiveTheme = theme;
    }

    // Apply theme
    root.classList.add(effectiveTheme);
    setActualTheme(effectiveTheme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Listen to system theme changes when theme is 'system'
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setActualTheme(mediaQuery.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
