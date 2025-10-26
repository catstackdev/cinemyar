export interface SplashScreenProps
  extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
  className?: string;
  onComplete: () => void;
  isAppReady?: boolean;
}
