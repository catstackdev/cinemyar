import { forwardRef } from "react";
import type { ButtonProps } from "./Button.types";
import { cn } from "@/utils/helpers/classNames";
import { buttonSizes, buttonVariants, loadingSize } from "./constants";
import Loading from "../Loading";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      color = "primary",
      size = "md",
      isLoading = false,
      isDisabled = false,
      leftIcon,
      rightIcon,
      children,
      className,
      fullWidth = false,
      loadingText,
      ...props
    },
    ref,
  ) => {
    console.log(props);
    const isButtonDisabled = isDisabled || isLoading;

    const variantClasses =
      buttonVariants[variant]?.[color] ?? buttonVariants.default.primary;

    const content = isLoading ? loadingText || children : children;
    const hoverCursorClass = isLoading
      ? "cursor-wait"
      : "cursor-pointer disabled:cursor-not-allowed ";

    const ariaLabel = isLoading
      ? typeof content === "string"
        ? `Loading: ${content}`
        : "Loading"
      : undefined;

    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50",

          hoverCursorClass,
          variantClasses,
          buttonSizes[size],
          fullWidth && "w-full",
          className,
        )}
        disabled={isButtonDisabled}
        aria-disabled={isButtonDisabled}
        aria-busy={isLoading}
        aria-label={ariaLabel}
        data-title={props.title}
      >
        {isLoading && (
          <Loading type="dots" size={loadingSize[size]} inline inheritColor />
        )}
        {leftIcon && (
          <span className={cn("inline-flex", isLoading && "opacity-100")}>
            {leftIcon}
          </span>
        )}
        <span className={cn(isLoading && !loadingText && "opacity-100")}>
          {content}
        </span>
        {rightIcon && (
          <span className={cn("inline-flex", isLoading && "opacity-100")}>
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
