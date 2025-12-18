import type { ReactNode } from 'react';
import type { DropzoneOptions } from 'react-dropzone';

export type DropzoneVariant = 'default' | 'dashed' | 'solid';
export type DropzoneSize = 'sm' | 'md' | 'lg';

export interface DropzoneProps extends Omit<DropzoneOptions, 'onDrop'> {
  className?: string;
  variant?: DropzoneVariant;
  size?: DropzoneSize;
  error?: string;
  disabled?: boolean;
  label?: string;
  description?: string;
  icon?: ReactNode;
  showFileList?: boolean;
  maxFiles?: number;
  onDrop: (acceptedFiles: File[], rejectedFiles: File[]) => void;
  files?: File[];
  onRemoveFile?: (index: number) => void;
}
