import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface TableProps extends ComponentPropsWithoutRef<"table"> {
  className?: string;
  children: ReactNode;
}

export interface TableHeaderProps extends ComponentPropsWithoutRef<"thead"> {
  className?: string;
  children: ReactNode;
}

export interface TableBodyProps extends ComponentPropsWithoutRef<"tbody"> {
  className?: string;
  children: ReactNode;
}

export interface TableRowProps extends ComponentPropsWithoutRef<"tr"> {
  className?: string;
  children: ReactNode;
}

export interface TableHeadProps extends ComponentPropsWithoutRef<"th"> {
  className?: string;
  children?: ReactNode;
}

export interface TableCellProps extends ComponentPropsWithoutRef<"td"> {
  className?: string;
  children?: ReactNode;
}

export interface TableFooterProps extends ComponentPropsWithoutRef<"tfoot"> {
  className?: string;
  children: ReactNode;
}

export interface TableCaptionProps extends ComponentPropsWithoutRef<"caption"> {
  className?: string;
  children: ReactNode;
}
