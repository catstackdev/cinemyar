import type { DividerProps } from "./Divider.types";
import { cn } from "@/utils/helpers/classNames";

const Divider = ({
  orientation = "horizontal",
  label,
  className,
  ...rest
}: DividerProps) => {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn(
          "w-px bg-gray-200 dark:bg-gray-700",
          className
        )}
        {...rest}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn("relative flex items-center", className)}
        {...rest}
      >
        <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
        <span className="px-3 text-sm text-gray-500 dark:text-gray-400">
          {label}
        </span>
        <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn(
        "border-t border-gray-200 dark:border-gray-700",
        className
      )}
      {...rest}
    />
  );
};

export default Divider;
