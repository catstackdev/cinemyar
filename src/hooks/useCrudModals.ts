import { useCallback } from 'react';
import { useModal } from './useModal';
import type { UseModalReturn } from './useModal';

export interface UseCrudModalsOptions<T> {
  onDelete?: (id: string) => void;
  onUpdate?: (item: T) => void;
  onCreate?: () => void;
}

export interface UseCrudModalsReturn<T> {
  // Individual modal instances
  createModal: UseModalReturn<void>;
  updateModal: UseModalReturn<T>;
  deleteModal: UseModalReturn<T>;
  
  // Legacy API for backward compatibility
  modals: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  
  itemToUpdate: T | null;
  itemToDelete: T | null;
  
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openUpdateModal: (item: T) => void;
  closeUpdateModal: () => void;
  openDeleteModal: (item: T) => void;
  closeDeleteModal: () => void;
  
  // Event handlers with stopPropagation
  handleUpdateClick: (item: T, e: React.MouseEvent) => void;
  handleDeleteClick: (item: T, e: React.MouseEvent) => void;
  
  // Confirm delete action
  confirmDelete: () => void;
}

/**
 * Centralized modal state management for CRUD operations
 * Now uses individual useModal hooks for each modal type
 * 
 * @example
 * const { createModal, deleteModal, handleDeleteClick } = useCrudModals<Genre>({
 *   onDelete: (id) => deleteGenre(id),
 *   onCreate: () => console.log('Creating...'),
 * });
 * 
 * // Use the modal instances directly
 * <AddModal open={createModal.isOpen} onOpenChange={createModal.setIsOpen} />
 * 
 * // Or use the legacy API
 * <AddModal open={modals.create} onOpenChange={closeCreateModal} />
 */
export function useCrudModals<T extends { id: string }>(
  options: UseCrudModalsOptions<T> = {},
): UseCrudModalsReturn<T> {
  const { onDelete, onUpdate, onCreate } = options;

  // Create separate modal instances using useModal hook
  const createModal = useModal<void>({
    onOpen: onCreate,
  });

  const updateModal = useModal<T>({
    onOpen: (item) => onUpdate?.(item!),
  });

  const deleteModal = useModal<T>();

  // Event handlers with stopPropagation
  const handleUpdateClick = useCallback(
    (item: T, e: React.MouseEvent) => {
      e.stopPropagation();
      updateModal.open(item);
    },
    [updateModal],
  );

  const handleDeleteClick = useCallback(
    (item: T, e: React.MouseEvent) => {
      e.stopPropagation();
      deleteModal.open(item);
    },
    [deleteModal],
  );

  // Confirm delete
  const confirmDelete = useCallback(() => {
    if (deleteModal.data && onDelete) {
      onDelete(deleteModal.data.id);
    }
  }, [deleteModal.data, onDelete]);

  return {
    // New API - direct modal access
    createModal,
    updateModal,
    deleteModal,

    // Legacy API for backward compatibility
    modals: {
      create: createModal.isOpen,
      update: updateModal.isOpen,
      delete: deleteModal.isOpen,
    },
    itemToUpdate: updateModal.data,
    itemToDelete: deleteModal.data,
    openCreateModal: () => createModal.open(),
    closeCreateModal: createModal.close,
    openUpdateModal: updateModal.open,
    closeUpdateModal: updateModal.close,
    openDeleteModal: deleteModal.open,
    closeDeleteModal: deleteModal.close,
    handleUpdateClick,
    handleDeleteClick,
    confirmDelete,
  };
}
