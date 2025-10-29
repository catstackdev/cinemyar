import type { CardContentProps } from "./Card.types";
import { cn } from "@/utils/helpers/classNames";

const CardContent = ({ children, className, ...rest }: CardContentProps) => {
  return (
    <div
      className={cn("px-6 py-4", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

CardContent.displayName = "CardContent";

export default CardContent;
