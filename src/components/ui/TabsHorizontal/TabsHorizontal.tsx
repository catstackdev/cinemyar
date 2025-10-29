import { useLocation, Link } from "react-router-dom";
import type {
  TabsHorizontalProps,
  TabItemHorizontal,
} from "./TabsHorizontal.types";
import { cn } from "@/utils/helpers/classNames";
import { Badge } from "@/components/ui";

const TabsHorizontal = ({
  sections,
  className,
  variant = "underline",
}: TabsHorizontalProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const renderTabButton = (item: TabItemHorizontal) => {
    const active = isActive(item.path);

    const baseClasses = cn(
      "inline-flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all",
      item.disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    );

    const variantClasses = {
      default: cn(
        "border rounded-lg",
        active
          ? "bg-primary text-primary-foreground border-primary shadow-sm"
          : "bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground",
      ),
      pills: cn(
        "rounded-full",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
      ),
      underline: cn(
        "border-b-2 rounded-none -mb-px",
        active
          ? "border-primary text-primary"
          : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
      ),
    };

    return (
      <Link
        key={item.id}
        to={item.path}
        role="tab"
        aria-selected={active}
        aria-current={active ? "page" : undefined}
        className={cn(baseClasses, variantClasses[variant])}
      >
        {item.icon && (
          <span
            className={cn(
              "flex-shrink-0",
              active ? "text-current" : "text-muted-foreground",
            )}
          >
            {item.icon}
          </span>
        )}
        <span>{item.name}</span>
        {item.badge &&
          (typeof item.badge === "string" ? (
            <Badge size="sm" variant="success">
              {item.badge}
            </Badge>
          ) : (
            <Badge size="sm" variant={item.badge.variant}>
              {item.badge.label}
            </Badge>
          ))}
      </Link>
    );
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        role="tablist"
        className={cn(
          "flex items-center gap-1 overflow-x-auto scrollbar-thin",
          variant === "underline" && "border-b border-border",
        )}
      >
        {sections.map(renderTabButton)}
      </div>
    </div>
  );
};

TabsHorizontal.displayName = "TabsHorizontal";

export default TabsHorizontal;
