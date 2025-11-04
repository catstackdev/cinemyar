import { forwardRef } from "react";
import type { TableProps } from "./Table.types";
import { cn } from "@/utils/helpers/classNames";

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="w-full overflow-auto scrollbar-thin">
        <table
          ref={ref}
          className={cn(
            "w-full caption-bottom text-sm",
            "border-separate border-spacing-0",
            className
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  },
);

Table.displayName = "Table";

export default Table;
