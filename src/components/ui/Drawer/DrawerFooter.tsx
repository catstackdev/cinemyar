import { cn } from "@/utils/helpers/classNames";
import type { DrawerFooterProps } from "./Drawer.types";

export const DrawerFooter = ({
  children,
  className,
  ...rest
}: DrawerFooterProps) => {
  return (
    <div
      className={cn(
        "flex gap-2 px-6 py-4 border-t border-border justify-end",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default DrawerFooter;
