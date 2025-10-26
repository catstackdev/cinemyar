import type { AlertProps } from "./Alert.types";
import { cn } from "@/utils/helpers/classNames";
import { variantClasses } from "./constants";
import { InfoIcon, SuccessIcon, WarningIcon, DangerIcon } from "./icons";

const Alert = ({
  children,
  variant = "info",
  title,
  onClose,
  className,
  ...rest
}: AlertProps) => {
  const iconMap = {
    info: InfoIcon,
    success: SuccessIcon,
    warning: WarningIcon,
    danger: DangerIcon,
  };
  const Icon = iconMap[variant];
  
  return (
    <div
      role="alert"
      className={cn(
        "relative rounded-lg border p-4",
        variantClasses[variant],
        className
      )}
      {...rest}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium">{title}</h3>
          )}
          <div className={cn("text-sm", title && "mt-2")}>
            {children}
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 hover:bg-foreground/10 transition-colors"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
