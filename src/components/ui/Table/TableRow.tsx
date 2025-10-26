import { forwardRef } from "react";
import type { TableRowProps } from "./Table.types";
import { cn } from "@/utils/helpers/classNames";

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          "border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-gray-100",
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
