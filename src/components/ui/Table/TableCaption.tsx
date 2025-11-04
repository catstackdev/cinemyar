import { forwardRef } from "react";
import type { TableCaptionProps } from "./Table.types";
import { cn } from "@/utils/helpers/classNames";

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <caption
        ref={ref}
        className={cn(
          "mt-4 text-sm text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
      </caption>
    );
  },
);

TableCaption.displayName = "TableCaption";

export default TableCaption;
