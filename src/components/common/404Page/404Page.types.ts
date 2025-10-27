export interface NotFoundPageProps
  extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
  className?: string;
  message?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
}
