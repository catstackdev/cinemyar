import { cn } from "@/utils/helpers/classNames";
import { useDrawerContext } from "./DrawerContext";
import type { DrawerDescriptionProps } from "./Drawer.types";

export const DrawerDescription = ({
  children,
  className,
  ...rest
}: DrawerDescriptionProps) => {
  const { descriptionId } = useDrawerContext();

  return (
    <p
      id={descriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...rest}
    >
      {children}
    </p>
  );
};

export default DrawerDescription;
