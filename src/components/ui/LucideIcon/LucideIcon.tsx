import React from "react";
import { cn } from "@/utils/helpers/classNames";
import type { LucideIconProps } from "./LucideIcon.types";
import * as Icons from "lucide-react";
import { sizeMap } from "./const";

const LucideIcon: React.FC<LucideIconProps> = ({
  name,
  size = "md",
  className,
  color,
  ...props
}) => {
  const IconComponent = (Icons as any)[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" does not exist in lucide-react`);
    return <Icons.HelpCircle size={sizeMap[size]} className={className} />;
  }

  return (
    <IconComponent
      size={sizeMap[size]}
      className={cn("shrink-0", className)}
      color={color}
      {...props}
    />
  );
};

export default LucideIcon;
