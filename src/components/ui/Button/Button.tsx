import {
  forwardRef,
  type ElementType,
  useState,
  useRef,
  useCallback,
} from "react";
import type { ButtonProps, PolymorphicRef } from "./Button.types";
import { cn } from "@/utils/helpers/classNames";
import {
  buttonSizes,
  buttonVariants,
  iconOnlySizes,
  elevationClasses,
} from "./constants";
import JumpingDots from "../JumpingDots";

const Button = forwardRef(
  <C extends ElementType = "button">(
    {
      as,
      variant = "glass",
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
      iconOnly = false,
      elevation = "none",
      withRipple = true,
      withPulse = false,
      onClick,
      ...props
    }: ButtonProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || "button";
    const isButtonDisabled = disabled || isLoading;
    const buttonRef = useRef<HTMLElement>(null);
    const [ripples, setRipples] = useState<
      Array<{ x: number; y: number; id: number }>
    >([]);

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

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        if (withRipple && buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const id = Date.now();

          setRipples((prev) => [...prev, { x, y, id }]);

          setTimeout(() => {
            setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
          }, 600);
        }

        onClick?.(e as any);
      },
      [withRipple, onClick],
    );

    return (
      <Component
        ref={(node: any) => {
          (buttonRef as any).current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as any).current = node;
          }
        }}
        {...props}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium relative overflow-hidden",
          "transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          hoverCursorClass,
          variantClasses,
          iconOnly ? iconOnlySizes[size] : buttonSizes[size],
          elevationClasses[elevation],
          fullWidth && "w-full",
          withPulse && "animate-[button-pulse_2s_ease-in-out_infinite]",
          className,
        )}
        disabled={Component === "button" ? isButtonDisabled : undefined}
        aria-disabled={isButtonDisabled}
        aria-busy={isLoading}
        aria-label={ariaLabel}
      >
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/40 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 10,
              height: 10,
              transform: "translate(-50%, -50%)",
              animation: "button-ripple 0.6s ease-out",
            }}
          />
        ))}
        {/* {isLoading && ( */}
        {/*   <Loading type="dots" size={loadingSize[size]} inline inheritColor /> */}
        {/* )} */}
        {leftIcon && !iconOnly && (
          <span
            className={cn(
              "inline-flex transition-transform duration-200",
              isLoading && "opacity-100",
            )}
          >
            {leftIcon}
          </span>
        )}
        {iconOnly ? (
          leftIcon || rightIcon || children
        ) : (
          <span
            className={cn(
              "transition-all duration-200",
              isLoading && !loadingText && "opacity-100",
            )}
          >
            {content}
          </span>
        )}
        {rightIcon && !iconOnly && (
          <span
            className={cn(
              "inline-flex transition-transform duration-200",
              isLoading && "opacity-100",
            )}
          >
            {rightIcon}
          </span>
        )}
        {isLoading && <JumpingDots />}
      </Component>
    );
  },
);

Button.displayName = "Button";

export default Button;
