export interface PaginationProps extends React.ComponentPropsWithoutRef<"nav"> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean | undefined;
  siblingCount?: number | undefined;
  className?: string | undefined;
}
