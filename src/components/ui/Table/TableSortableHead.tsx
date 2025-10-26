import { forwardRef } from "react";
import type { TableHeadProps } from "./Table.types";
import { cn } from "@/utils/helpers/classNames";
import type { SortDirection } from "./hooks/useTableSort";

export interface TableSortableHeadProps extends TableHeadProps {
  sortDirection?: SortDirection;
  onSort?: () => void;
}

const TableSortableHead = forwardRef<HTMLTableCellElement, TableSortableHeadProps>(
  ({ sortDirection, onSort, className, children, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          "h-12 px-4 text-left align-middle font-medium text-gray-500",
          onSort && "cursor-pointer select-none hover:bg-gray-50",
          "[&:has([role=checkbox])]:pr-0",
          className,
        )}
        onClick={onSort}
        {...props}
      >
        <div className="flex items-center gap-2">
          {children}
          {onSort && (
            <span className="inline-flex flex-col">
              <svg
                className={cn(
                  "h-3 w-3 transition-opacity",
                  sortDirection === "asc" ? "opacity-100" : "opacity-30"
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className={cn(
                  "h-3 w-3 -mt-1 transition-opacity",
                  sortDirection === "desc" ? "opacity-100" : "opacity-30"
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}
        </div>
      </th>
    );
  },
);

TableSortableHead.displayName = "TableSortableHead";

export default TableSortableHead;
