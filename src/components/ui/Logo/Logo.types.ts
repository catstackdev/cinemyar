export type LogoVariant = "full" | "icon" | "text";
export type LogoSize = "sm" | "md" | "lg" | "xl";

export interface LogoProps extends React.ComponentPropsWithoutRef<"div"> {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  animated?: boolean;
  iconDelay?: string;
  textDelay?: string;
  subtitleDelay?: string;
}
