import { forwardRef } from "react";
import type { TableHeadProps } from "./Table.types";
import { cn } from "@/utils/helpers/classNames";

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          "h-12 px-4 text-left align-middle",
          "font-semibold text-xs uppercase tracking-wide",
          "text-muted-foreground",
          "[&:has([role=checkbox])]:pr-0",
          className,
        )}
        {...props}
      >
        {children}
      </th>
    );
  },
);

TableHead.displayName = "TableHead";

export default TableHead;
