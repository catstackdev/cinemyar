import { useMatches } from "react-router-dom";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumb";
import type { ReactNode } from "react";

interface RouteHandle {
  breadcrumb?: {
    // label: string;
    label: string | ((data: any) => string);
    icon?: string | ReactNode;
    iconUrl?: string | ((data: any) => string);
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
      const loaderData = match.data; // The data returned from your loader

      // 1. Resolve Label
      const labelConfig = handle.breadcrumb!.label;
      const label =
        typeof labelConfig === "function"
          ? labelConfig(loaderData)
          : labelConfig;

      // 2. Resolve Icon URL (New)
      const iconUrlConfig = handle.breadcrumb?.iconUrl;
      const iconUrl =
        typeof iconUrlConfig === "function"
          ? iconUrlConfig(loaderData)
          : iconUrlConfig;

      return {
        label,
        href: isLast ? undefined : match.pathname,
        icon: handle.breadcrumb!.icon,
        iconUrl,
      };
    });

  return breadcrumbs;
};
