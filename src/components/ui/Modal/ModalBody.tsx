import { cn } from "@/utils/helpers/classNames";
import type { ReactNode } from "react";

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

export const ModalBody = ({
  children,
  className,
}: ModalBodyProps) => (
  <div
    className={cn(
      "px-6 py-4 flex-1 overflow-y-auto",
      className,
    )}
  >
    {children}
  </div>
);

export default ModalBody;
