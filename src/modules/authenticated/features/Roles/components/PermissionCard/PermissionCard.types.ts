export interface PermissionCardProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
  className?: string;
  permissions: string[];
  entity: string;
}
