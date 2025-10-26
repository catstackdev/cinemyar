export type SkeletonVariant = "text" | "circular" | "rectangular";

export interface SkeletonProps extends React.ComponentPropsWithoutRef<"div"> {
  variant?: SkeletonVariant | undefined;
  width?: string | number | undefined;
  height?: string | number | undefined;
  className?: string | undefined;
}
