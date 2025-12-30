import type { FilterGroup } from "@/components/ui/Params/ParamFilterDropdown/ParamFilterDropdown.types";

export interface StateFilterProps {
  children?: React.ReactNode;
  className?: string;
  filters: FilterGroup[];
  loading?: boolean;
  defaultValues?: Record<string, string>;
  onFilterChange?: (values: Record<string, string>) => void;
  zIndex?: number;
}
