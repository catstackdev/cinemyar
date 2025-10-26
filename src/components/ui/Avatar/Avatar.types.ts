export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends React.ComponentPropsWithoutRef<"div"> {
  src?: string | undefined;
  alt?: string | undefined;
  size?: AvatarSize | undefined;
  fallback?: string | undefined;
  className?: string | undefined;
}
