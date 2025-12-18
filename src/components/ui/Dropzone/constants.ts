import type { DropzoneVariant, DropzoneSize } from './Dropzone.types';

export const DROPZONE_VARIANTS: Record<DropzoneVariant, string> = {
  default: 'border-2 border-dashed border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10',
  dashed: 'border-2 border-dashed border-secondary-300 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-900/30 hover:border-primary/50 hover:bg-primary/5',
  solid: 'border-2 border-solid border-secondary-200 dark:border-secondary-800 bg-secondary-50 dark:bg-secondary-900/50 hover:border-primary hover:bg-primary/5',
};

export const DROPZONE_SIZES: Record<DropzoneSize, string> = {
  sm: 'p-4 min-h-[120px]',
  md: 'p-6 min-h-[180px]',
  lg: 'p-8 min-h-[240px]',
};

export const DROPZONE_DISABLED_CLASSES = 'opacity-50 cursor-not-allowed hover:border-secondary-300 dark:hover:border-secondary-700 hover:bg-transparent';

export const DROPZONE_ERROR_CLASSES = 'border-danger/50 bg-danger/5 hover:border-danger/70 hover:bg-danger/10';

export const DROPZONE_ACTIVE_CLASSES = 'border-primary bg-primary/20 scale-[1.02]';
