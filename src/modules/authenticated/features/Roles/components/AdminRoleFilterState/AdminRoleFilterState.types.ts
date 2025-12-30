export interface AdminRoleFilterStateProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
  className?: string;
  onFilterChange?: (filters: Record<string, string>) => void;
  defaultValues?: Record<string, string>;
  exceptdynamicRoleId?: string;
}
