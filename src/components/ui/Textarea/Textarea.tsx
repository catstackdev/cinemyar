import { forwardRef } from "react";
import type { TextareaProps } from "./Textarea.types";
import { cn } from "@/utils/helpers/classNames";
import { textareaResize } from "./constants";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ resize = "vertical", error = false, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-md border px-3 py-2 text-sm transition-colors",
          "placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 hover:border-gray-400",
          textareaResize[resize],
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
