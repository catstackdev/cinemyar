import { cn } from "@/utils/helpers/classNames";
import type { ReactNode } from "react";
import { useModalContext } from "./ModalContext";

export const ModalTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { titleId } = useModalContext();

  return (
    <h2
      id={titleId}
      className={cn("text-lg font-semibold text-foreground", className)}
    >
      {children}
    </h2>
  );
};

export default ModalTitle;
