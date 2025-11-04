import { forwardRef } from "react";
import type { TableBodyProps } from "./Table.types";
import { cn } from "@/utils/helpers/classNames";

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn(
          "[&_tr:last-child]:border-0",
          "bg-card/50",
          className
        )}
        {...props}
      >
        {children}
      </tbody>
    );
  },
);

TableBody.displayName = "TableBody";

export default TableBody;
