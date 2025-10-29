import { forwardRef, type ElementType } from "react";
import type { ButtonProps, PolymorphicRef } from "./Button.types";
import { cn } from "@/utils/helpers/classNames";
import { buttonSizes, buttonVariants, loadingSize } from "./constants";
import Loading from "../Loading";

const Button = forwardRef(
  <C extends ElementType = "button">(
    {
      as,
      variant = "default",
      color = "primary",
      size = "md",
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      className,
      fullWidth = false,
      loadingText,
      ...props
    }: ButtonProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || "button";
    const isButtonDisabled = disabled || isLoading;

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
      <Component
        ref={ref}
        {...props}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50",
          hoverCursorClass,
          variantClasses,
          buttonSizes[size],
          fullWidth && "w-full",
          className,
        )}
        disabled={Component === "button" ? isButtonDisabled : undefined}
        aria-disabled={isButtonDisabled}
        aria-busy={isLoading}
        aria-label={ariaLabel}
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
      </Component>
    );
  },
);

Button.displayName = "Button";

export default Button;
