import type { ReactNode } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  iconUrl?: string;
}

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string | undefined;
}
