import type { CardProps } from "./Card.types";
import { cn } from "@/utils/helpers/classNames";

const Card = ({ children, className, ...rest }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground shadow-lg",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

Card.displayName = "Card";

export default Card;
