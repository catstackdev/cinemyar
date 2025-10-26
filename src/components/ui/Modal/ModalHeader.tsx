import { cn } from "@/utils/helpers/classNames";
import type { ReactNode } from "react";

export const ModalHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn("px-6 py-4 border-b border-border shrink-0", className)}>
    {children}
  </div>
);

export default ModalHeader;
