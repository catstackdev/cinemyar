import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

// export interface TableActionButtonsProps<T extends { id: string }> {
//   item: T;
//   canUpdate?: boolean;
//   canDelete?: boolean;
//   onUpdate?: (item: T, e: React.MouseEvent) => void;
//   onDelete?: (item: T, e: React.MouseEvent) => void;
//   isUpdating?: boolean;
//   isDeleting?: boolean;
//   updateIcon?: ComponentType<LucideProps>;
//   deleteIcon?: ComponentType<LucideProps>;
//   updateText?: string;
//   deleteText?: string;
//   className?: string;
// }
export interface TableActionButtonsProps<T> {
  key: string;
  label: string;
  icon: ComponentType<LucideProps>;
  onClick: (item: T, e: React.MouseEvent) => void;
  visible?: boolean;
  loading?: boolean;
  variant?: "primary" | "danger" | "success";
}
