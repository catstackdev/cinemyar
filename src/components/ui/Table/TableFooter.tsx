import { forwardRef } from "react";
import type { TableFooterProps } from "./Table.types";
import { cn } from "@/utils/helpers/classNames";

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tfoot
        ref={ref}
        className={cn(
          "bg-muted/30 font-medium",
          "border-t border-border/50",
          "[&_tr]:hover:bg-transparent",
          className
        )}
        {...props}
      >
        {children}
      </tfoot>
    );
  },
);

TableFooter.displayName = "TableFooter";

export default TableFooter;
