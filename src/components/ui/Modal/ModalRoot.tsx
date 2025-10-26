import { useState, useMemo, useCallback } from "react";
import type { ReactNode } from "react";
import { ModalContext } from "./ModalContext";

let modalIdCounter = 0;

interface ModalRootProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

export const ModalRoot = ({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
}: ModalRootProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [titleId] = useState(`modal-title-${++modalIdCounter}`);
  const [descriptionId] = useState(`modal-desc-${modalIdCounter}`);

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
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalRoot;
