import { useState, useCallback } from "react";

export interface UseModalOptions<T = unknown> {
  /**
   * Initial open state
   * @default false
   */
  initialOpen?: boolean;

  /**
   * Callback when modal opens
   */
  onOpen?: (data?: T) => void;

  /**
   * Callback when modal closes
   */
  onClose?: () => void;

  /**
   * Callback when data is set
   */
  onDataChange?: (data: T | null) => void;
}

export interface UseModalReturn<T = unknown> {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;

  /**
   * Data associated with the modal
   */
  data: T | null;

  /**
   * Open the modal
   */
  open: (data?: T) => void;

  /**
   * Close the modal and clear data
   */
  close: () => void;

  /**
   * Toggle modal state
   */
  toggle: () => void;

  /**
   * Set modal data without opening
   */
  setData: (data: T | null) => void;

  /**
   * Clear modal data without closing
   */
  clearData: () => void;

  /**
   * Set open state directly (for controlled usage)
   */
  setIsOpen: (open: boolean) => void;
}

/**
 * Generic hook for managing modal state
 *
 * @example
 * // Simple usage
 * const modal = useModal();
 * <Modal open={modal.isOpen} onOpenChange={modal.setIsOpen}>
 *   <button onClick={modal.close}>Close</button>
 * </Modal>
 *
 * @example
 * // With data
 * const editModal = useModal<User>();
 * <button onClick={() => editModal.open(user)}>Edit</button>
 * <EditUserModal
 *   open={editModal.isOpen}
 *   user={editModal.data}
 *   onClose={editModal.close}
 * />
 *
 * @example
 * // With callbacks
 * const deleteModal = useModal<Item>({
 *   onOpen: (item) => console.log('Opening delete modal for', item),
 *   onClose: () => console.log('Modal closed'),
 * });
 */
export function useModal<T = unknown>(
  options: UseModalOptions<T> = {},
): UseModalReturn<T> {
  const { initialOpen = false, onOpen, onClose, onDataChange } = options;

  const [isOpen, setIsOpen] = useState(initialOpen);
  const [data, setData] = useState<T | null>(null);

  const open = useCallback(
    (newData?: T) => {
      if (newData !== undefined || newData != null) {
        setData(newData);
        onDataChange?.(newData);
      }
      setIsOpen(true);
      onOpen?.(newData);
    },
    [onOpen, onDataChange],
  );

  const close = useCallback(() => {
    setIsOpen(false);
    setData(null);
    onClose?.();
    onDataChange?.(null);
  }, [onClose, onDataChange]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  const handleSetData = useCallback(
    (newData: T | null) => {
      setData(newData);
      onDataChange?.(newData);
    },
    [onDataChange],
  );

  const clearData = useCallback(() => {
    setData(null);
    onDataChange?.(null);
  }, [onDataChange]);

  return {
    isOpen,
    data,
    open,
    close,
    toggle,
    setData: handleSetData,
    clearData,
    setIsOpen,
  };
}
