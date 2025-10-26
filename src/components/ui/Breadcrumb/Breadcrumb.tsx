import type { BreadcrumbProps } from "./Breadcrumb.types";
import { cn } from "@/utils/helpers/classNames";

const ChevronIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

const Breadcrumb = ({
  items,
  separator = <ChevronIcon />,
  className,
  ...rest
}: BreadcrumbProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-1", className)}
      {...rest}
    >
      <ol className="inline-flex items-center space-x-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <span className="mx-2 text-muted-foreground">
                  {separator}
                </span>
              )}
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className={cn(
                    "inline-flex items-center text-sm font-medium",
                    "text-foreground hover:text-primary",
                    "transition-colors"
                  )}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    "inline-flex items-center text-sm font-medium",
                    isLast
                      ? "text-muted-foreground"
                      : "text-foreground"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
