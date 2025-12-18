import { Button } from "@/components/ui";
import type { TableActionButtonsProps } from "./TableActionButtons.types";

export const TableActionButtons = <T extends { id: string }>({
  item,
  actions,
}: {
  item: T;
  actions: TableActionButtonsProps<T>[];
}) => (
  <div className="flex justify-end gap-2">
    {actions
      .filter((a) => a.visible !== false)
      .map((action) => (
        <Button
          key={action.key}
          variant="glass"
          color={action.variant}
          size="xs"
          onClick={(e) => action.onClick(item, e)}
          isLoading={action.loading}
          aria-label={action.label}
        >
          <action.icon className="size-4" />
        </Button>
      ))}
  </div>
);

/**
 * Standardized action buttons for table rows (Edit/Delete)
 *
 * @example
 * <TableActionButtons
 *   item={genre}
 *   canUpdate={canUpdate}
 *   canDelete={canDelete}
 *   onUpdate={handleUpdateClick}
 *   onDelete={handleDeleteClick}
 *   isDeleting={isDeleting && itemToDelete?.id === genre.id}
 * />
 */
// export const TableActionButtons = <T extends { id: string }>({
//   item,
//   canUpdate = true,
//   canDelete = true,
//   onUpdate,
//   onDelete,
//   isUpdating = false,
//   isDeleting = false,
//   updateIcon,
//   deleteIcon,
//   updateText,
//   deleteText,
//   className,
// }: TableActionButtonsProps<T>) => {
//   const UpdateIcon = updateIcon || Edit;
//   const DeleteIcon = deleteIcon || Trash2;
//
//   return (
//     <div className={`flex justify-end gap-2 ${className || ''}`}>
//       {canUpdate && onUpdate && (
//         <Button
//           variant="glass"
//           color="primary"
//           size="xs"
//           onClick={(e: React.MouseEvent) => onUpdate(item, e)}
//           isLoading={isUpdating}
//           className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//           aria-label={updateText || 'Edit'}
//         >
//           <UpdateIcon className="size-4" />
//         </Button>
//       )}
//
//       {canDelete && onDelete && (
//         <Button
//           variant="glass"
//           color="danger"
//           size="xs"
//           onClick={(e: React.MouseEvent) => onDelete(item, e)}
//           isLoading={isDeleting}
//           className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//           aria-label={deleteText || 'Delete'}
//         >
//           <DeleteIcon className="size-4" />
//         </Button>
//       )}
//     </div>
//   );
// };
