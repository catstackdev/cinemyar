import Table from "./Table";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableRow from "./TableRow";
import TableHead from "./TableHead";
import TableCell from "./TableCell";
import TableFooter from "./TableFooter";
import TableCaption from "./TableCaption";
import TableSortableHead from "./TableSortableHead";

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  TableCaption,
  TableSortableHead,
};

export type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableFooterProps,
  TableCaptionProps,
} from "./Table.types";

export type { TableSortableHeadProps } from "./TableSortableHead";
export { useTableSort } from "./hooks/useTableSort";
export type { SortDirection, SortConfig, UseTableSortReturn } from "./hooks/useTableSort";

export default Table;
