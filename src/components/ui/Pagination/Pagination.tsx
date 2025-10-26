import type { PaginationProps } from "./Pagination.types";
import { cn } from "@/utils/helpers/classNames";
import { usePagination } from "./usePagination";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  siblingCount = 1,
  className,
  ...rest
}: PaginationProps) => {
  const pages = usePagination({
    currentPage,
    totalPages,
    siblingCount,
  });

  const buttonClass = (isActive: boolean, isDisabled: boolean = false) =>
    cn(
      "px-3 py-2 text-sm font-medium rounded-md transition-colors",
      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
      "focus:ring-offset-background",
      isDisabled
        ? "opacity-50 cursor-not-allowed text-muted-foreground"
        : isActive
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "text-foreground hover:bg-muted"
    );

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("flex items-center justify-center space-x-1", className)}
      {...rest}
    >
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={buttonClass(false, currentPage === 1)}
          aria-label="Go to first page"
        >
          First
        </button>
      )}

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={buttonClass(false, currentPage === 1)}
        aria-label="Go to previous page"
      >
        Previous
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-3 py-2 text-muted-foreground">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={buttonClass(page === currentPage)}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={buttonClass(false, currentPage === totalPages)}
        aria-label="Go to next page"
      >
        Next
      </button>

      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={buttonClass(false, currentPage === totalPages)}
          aria-label="Go to last page"
        >
          Last
        </button>
      )}
    </nav>
  );
};

export default Pagination;
