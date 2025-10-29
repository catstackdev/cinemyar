import type { ReactNode } from "react";

export interface TabItemHorizontal {
  id: string;
  name: string;
  path: string;
  icon?: ReactNode;
  badge?:
    | string
    | {
        label: string;
        variant: "default" | "success" | "warning" | "danger";
      };
  disabled?: boolean;
}

export interface TabsHorizontalProps {
  sections: TabItemHorizontal[];
  className?: string;
  variant?: "default" | "pills" | "underline";
}
