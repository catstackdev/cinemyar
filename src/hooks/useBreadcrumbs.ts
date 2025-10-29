import { useMatches } from "react-router-dom";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import type { ReactNode } from "react";

interface RouteHandle {
  breadcrumb?: {
    label: string;
    icon?: string | ReactNode;
  };
}

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const matches = useMatches();

  const breadcrumbs = matches
    .filter((match) => {
      const handle = match.handle as RouteHandle | undefined;
      return handle?.breadcrumb?.label;
    })
    .map((match, index, array) => {
      const handle = match.handle as RouteHandle;
      const isLast = index === array.length - 1;

      return {
        label: handle.breadcrumb!.label,
        href: isLast ? undefined : match.pathname,
        icon: handle.breadcrumb!.icon,
      };
    });

  return breadcrumbs;
};
