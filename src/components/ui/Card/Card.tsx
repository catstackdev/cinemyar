import type { CardProps } from "./Card.types";
import { cn } from "@/utils/helpers/classNames";

const Card = ({ children, className, ...rest }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-6 shadow-sm text-card-foreground ",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
