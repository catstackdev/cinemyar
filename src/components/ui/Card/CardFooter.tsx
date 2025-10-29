import type { CardFooterProps } from "./Card.types";
import { cn } from "@/utils/helpers/classNames";

const CardFooter = ({ 
  children, 
  className, 
  divided = false,
  ...rest 
}: CardFooterProps) => {
  return (
    <div
      className={cn(
        "px-6 py-4",
        divided && "border-t border-border",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

CardFooter.displayName = "CardFooter";

export default CardFooter;
