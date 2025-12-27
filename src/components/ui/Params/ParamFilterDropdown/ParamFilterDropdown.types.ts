import type { Option } from "@/types/options.types";

export interface ParamFilterDropdownProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
  className?: string;
  filters: FilterGroup[];
  selectedValues?: Record<string, string>;
  onFilterChange?: (values: Record<string, string | undefined>) => void;
  loading?: boolean;
}

export interface FilterGroup {
  name: string; // as primary key // param key
  title: string; // header
  options: Option<string | undefined>[];
  notShowChip?: boolean;
  defaultValue?: string;
  loading?: boolean;
}
