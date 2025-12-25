import { cn } from "@/utils/helpers/classNames";
import type { DrawerHeaderProps } from "./Drawer.types";

export const DrawerHeader = ({
  children,
  className,
  ...rest
}: DrawerHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 px-6 py-4 border-b border-border",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default DrawerHeader;
