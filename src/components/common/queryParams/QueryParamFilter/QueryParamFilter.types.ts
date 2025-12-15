import type { FilterGroup } from "@/components/ui/Params/ParamFilterDropdown/ParamFilterDropdown.types";

// export interface QueryParamFilterProps extends React.ComponentPropsWithoutRef<"div"> {
export interface QueryParamFilterProps {
  children?: React.ReactNode;
  className?: string;
  filters: FilterGroup[];
  loading?: boolean;
  defaultParams?: Record<string, string>;
}
