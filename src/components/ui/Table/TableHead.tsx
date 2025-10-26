import { forwardRef } from "react";
import type { TableHeadProps } from "./Table.types";
import { cn } from "@/utils/helpers/classNames";

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          "h-12 px-4 text-left align-middle font-medium text-gray-500",
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
