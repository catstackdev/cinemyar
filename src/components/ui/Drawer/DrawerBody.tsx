import { cn } from "@/utils/helpers/classNames";
import type { DrawerBodyProps } from "./Drawer.types";

export const DrawerBody = ({
  children,
  className,
  ...rest
}: DrawerBodyProps) => {
  return (
    <div
      className={cn("flex-1 overflow-y-auto px-6 py-4", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default DrawerBody;
