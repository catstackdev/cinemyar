import type { CardHeaderProps } from "./Card.types";
import { cn } from "@/utils/helpers/classNames";

const CardHeader = ({ 
  children, 
  className, 
  divided = false,
  ...rest 
}: CardHeaderProps) => {
  return (
    <div
      className={cn(
        "px-6 py-4",
        divided && "border-b border-border",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

CardHeader.displayName = "CardHeader";

export default CardHeader;
