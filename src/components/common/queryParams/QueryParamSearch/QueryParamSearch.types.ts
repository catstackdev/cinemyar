export interface QueryParamSearchProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
  className?: string;
  paramName?: string; // Default to 'search'
  debounceDelay?: number; // Default debounce delay
  placeholder?: string; // Default to 'Search...'
}
