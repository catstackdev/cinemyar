import { cn } from "@/utils/helpers/classNames";
import { useDrawerContext } from "./DrawerContext";
import type { DrawerTitleProps } from "./Drawer.types";

export const DrawerTitle = ({
  children,
  className,
  ...rest
}: DrawerTitleProps) => {
  const { titleId } = useDrawerContext();

  return (
    <h2
      id={titleId}
      className={cn("text-xl font-semibold text-foreground", className)}
      {...rest}
    >
      {children}
    </h2>
  );
};

export default DrawerTitle;
