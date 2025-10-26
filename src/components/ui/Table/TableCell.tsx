import { forwardRef } from "react";
import type { TableCellProps } from "./Table.types";
import { cn } from "@/utils/helpers/classNames";

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
        {...props}
      >
        {children}
      </td>
    );
  },
);

TableCell.displayName = "TableCell";

export default TableCell;
