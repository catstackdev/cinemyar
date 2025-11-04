import { forwardRef } from "react";
import type { TableHeaderProps } from "./Table.types";
import { cn } from "@/utils/helpers/classNames";

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn(
          "bg-gradient-to-r from-primary/5 via-muted/30 to-primary/5",
          "[&_tr]:border-b [&_tr]:border-border/50",
          "[&_tr]:hover:bg-transparent",
          className
        )}
        {...props}
      >
        {children}
      </thead>
    );
  },
);

TableHeader.displayName = "TableHeader";

export default TableHeader;
