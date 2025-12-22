export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
export interface LucideIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  className?: string;
  name: string;
  size?: IconSize;
}
