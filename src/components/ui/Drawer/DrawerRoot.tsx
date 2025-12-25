import { useState, useMemo, useCallback } from "react";
import type { ReactNode } from "react";
import { DrawerContext } from "./DrawerContext";

let drawerIdCounter = 0;

interface DrawerRootProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

export const DrawerRoot = ({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
}: DrawerRootProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [titleId] = useState(`drawer-title-${++drawerIdCounter}`);
  const [descriptionId] = useState(`drawer-desc-${drawerIdCounter}`);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (open: boolean) => {
      if (!isControlled) {
        setInternalOpen(open);
      }
      onOpenChange?.(open);
    },
    [isControlled, onOpenChange],
  );

  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);

  const contextValue = useMemo(
    () => ({
      titleId,
      descriptionId,
      isOpen,
      open,
      close,
    }),
    [titleId, descriptionId, isOpen, open, close],
  );

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerRoot;
