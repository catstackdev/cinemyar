import React from "react";
import type { LabelProps } from "./Label.types";
import { cn } from "@/utils/helpers/classNames";
import { LabelSizeClasses, LabelWeightClasses } from "./constants";

const Label: React.FC<LabelProps> = ({
  htmlFor,
  required = false,
  size = "md",
  weight = "medium",
  disabled = false,
  children,
  className,
  ...rest
}) => {
  const sizeStyle = LabelSizeClasses[size];
  const weightStyle = LabelWeightClasses[weight];

  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "block transition-colors",
        disabled
          ? "text-muted-foreground opacity-60 cursor-not-allowed"
          : "text-foreground",
        sizeStyle,
        weightStyle,
        className,
      )}
      {...rest}
    >
      {children}
      {required && (
        <span className="text-danger ml-1" aria-label="required">
          *
        </span>
      )}
    </label>
  );
};

export default Label;
