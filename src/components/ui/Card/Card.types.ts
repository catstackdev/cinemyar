import type { ReactNode } from "react";

export interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
  className?: string | undefined;
}

export interface CardHeaderProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
  className?: string | undefined;
  divided?: boolean;
}

export interface CardContentProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
  className?: string | undefined;
}

export interface CardFooterProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
  className?: string | undefined;
  divided?: boolean;
}

export interface CardTitleProps extends React.ComponentPropsWithoutRef<"h3"> {
  children?: ReactNode;
  className?: string | undefined;
}

export interface CardDescriptionProps extends React.ComponentPropsWithoutRef<"p"> {
  children?: ReactNode;
  className?: string | undefined;
}
