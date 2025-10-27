export interface AppWrapperProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
  className?: string;
}

export interface AppMetaProps {
  title: string;
  description: string;
}
