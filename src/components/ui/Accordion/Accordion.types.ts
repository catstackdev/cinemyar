import type { ReactNode } from "react";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean | undefined;
  defaultOpen?: string[] | undefined;
  className?: string | undefined;
}
