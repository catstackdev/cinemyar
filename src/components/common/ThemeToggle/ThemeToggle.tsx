import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/utils/helpers/classNames";
import type { ThemeToggleProps } from "./ThemeToggle.types";
import { ThemeSizeClasses } from "./constants";

export const ThemeToggle = ({
  className,
  showLabels = false,
  size = "md",
}: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const sizeClass = ThemeSizeClasses[size];

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-lg bg-muted",
        sizeClass.container,
        className,
      )}
    >
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "flex items-center justify-center rounded-md transition-colors",
          sizeClass.button,
          theme === "light"
            ? "bg-background shadow-sm"
            : "hover:bg-background/50",
          showLabels && "gap-2 px-3",
        )}
        aria-label="Light theme"
      >
        <Sun className={sizeClass.icon} />
        {showLabels && <span className="text-sm">Light</span>}
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "flex items-center justify-center rounded-md transition-colors",
          sizeClass.button,
          theme === "dark"
            ? "bg-background shadow-sm"
            : "hover:bg-background/50",
          showLabels && "gap-2 px-3",
        )}
        aria-label="Dark theme"
      >
        <Moon className={sizeClass.icon} />
        {showLabels && <span className="text-sm">Dark</span>}
      </button>

      <button
        onClick={() => setTheme("system")}
        className={cn(
          "flex items-center justify-center rounded-md transition-colors",
          sizeClass.button,
          theme === "system"
            ? "bg-background shadow-sm"
            : "hover:bg-background/50",
          showLabels && "gap-2 px-3",
        )}
        aria-label="System theme"
      >
        <Monitor className={sizeClass.icon} />
        {showLabels && <span className="text-sm">System</span>}
      </button>
    </div>
  );
};
