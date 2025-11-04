import { forwardRef } from "react";
import type { TableRowProps } from "./Table.types";
import { cn } from "@/utils/helpers/classNames";

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          "border-b border-border/30",
          "transition-all duration-200",
          "hover:bg-primary/5",
          "data-[state=selected]:bg-primary/10",
          "group",
          className,
        )}
        {...props}
      >
        {children}
      </tr>
    );
  },
);

TableRow.displayName = "TableRow";

export default TableRow;
