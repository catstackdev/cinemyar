import { cn } from "@/utils/helpers/classNames";
import { useDrawerContext } from "./DrawerContext";
import type { DrawerCloseProps } from "./Drawer.types";

export const DrawerClose = ({
  children,
  className,
  ...rest
}: DrawerCloseProps) => {
  const { close } = useDrawerContext();

  return (
    <button
      type="button"
      onClick={close}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
        "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring",
        "disabled:opacity-50 disabled:pointer-events-none",
        className,
      )}
      {...rest}
    >
      {children || "Close"}
    </button>
  );
};

export default DrawerClose;
