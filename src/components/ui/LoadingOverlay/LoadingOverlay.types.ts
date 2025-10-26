import type { LoadingProps } from "../Loading/Loading.types";

export interface LoadingOverlayProps
  extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  loadingProps?: LoadingProps;
}
