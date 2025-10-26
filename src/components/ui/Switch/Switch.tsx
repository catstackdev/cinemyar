import type { SwitchProps } from "./Switch.types";
import { cn } from "@/utils/helpers/classNames";
import { sizeClasses, toggleClasses } from "./constants";

const Switch = ({
  label,
  size = "md",
  disabled = false,
  className,
  id,
  checked,
  ...rest
}: SwitchProps) => {
  const switchId = id || `switch-${Math.random().toString(36).slice(2, 11)}`;
  const sizeClass = sizeClasses[size];
  const toggleClass = toggleClasses[size];

  return (
    <div className={cn("flex items-center", className)}>
      <label
        htmlFor={switchId}
        className={cn(
          "relative inline-flex items-center cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <input
          type="checkbox"
          id={switchId}
          className="sr-only peer"
          disabled={disabled}
          checked={checked}
          {...rest}
        />
        <div
          className={cn(
            "bg-muted rounded-full peer",
            "peer-focus:ring-4 peer-focus:ring-primary/20",
            "peer-checked:bg-primary",
            "peer-checked:after:translate-x-full",
            "after:content-[''] after:absolute after:bg-background after:rounded-full",
            "after:transition-all",
            disabled && "cursor-not-allowed",
            sizeClass,
            toggleClass,
          )}
        />
      </label>
      {label && (
        <span
          className={cn(
            "ml-3 text-sm font-medium text-foreground",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default Switch;
