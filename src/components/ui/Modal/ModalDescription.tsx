import { cn } from "@/utils/helpers/classNames";
import type { ReactNode } from "react";
import { useModalContext } from "./ModalContext";

export const ModalDescription = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { descriptionId } = useModalContext();

  return (
    <p
      id={descriptionId}
      className={cn("text-sm text-muted-foreground", className)}
    >
      {children}
    </p>
  );
};

export default ModalDescription;
