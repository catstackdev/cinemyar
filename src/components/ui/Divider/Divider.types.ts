export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps extends React.ComponentPropsWithoutRef<"div"> {
  orientation?: DividerOrientation | undefined;
  label?: string | undefined;
  className?: string | undefined;
}
