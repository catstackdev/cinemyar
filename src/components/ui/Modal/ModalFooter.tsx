import { cn } from "@/utils/helpers/classNames";
import type { ReactNode } from "react";

export const ModalFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={cn("px-6 py-4 border-t border-border flex justify-end gap-2 shrink-0", className)}
  >
    {children}
  </div>
);

export default ModalFooter;
