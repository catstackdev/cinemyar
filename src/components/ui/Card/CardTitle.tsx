import type { CardTitleProps } from "./Card.types";
import { cn } from "@/utils/helpers/classNames";

const CardTitle = ({ children, className, ...rest }: CardTitleProps) => {
  return (
    <h3
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...rest}
    >
      {children}
    </h3>
  );
};

CardTitle.displayName = "CardTitle";

export default CardTitle;
