import { forwardRef } from "react";
import type { TableHeaderProps } from "./Table.types";
import { cn } from "@/utils/helpers/classNames";

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn("[&_tr]:border-b", className)}
        {...props}
      >
        {children}
      </thead>
    );
  },
);

TableHeader.displayName = "TableHeader";

export default TableHeader;
