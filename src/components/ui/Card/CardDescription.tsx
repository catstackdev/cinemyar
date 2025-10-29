import type { CardDescriptionProps } from "./Card.types";
import { cn } from "@/utils/helpers/classNames";

const CardDescription = ({ children, className, ...rest }: CardDescriptionProps) => {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...rest}
    >
      {children}
    </p>
  );
};

CardDescription.displayName = "CardDescription";

export default CardDescription;
