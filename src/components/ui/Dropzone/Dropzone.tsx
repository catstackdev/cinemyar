import { forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';
import type { DropzoneProps } from './Dropzone.types';
import { cn } from '@/utils/helpers/classNames';
import {
  DROPZONE_VARIANTS,
  DROPZONE_SIZES,
  DROPZONE_DISABLED_CLASSES,
  DROPZONE_ERROR_CLASSES,
  DROPZONE_ACTIVE_CLASSES,
} from './constants';

const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      error,
      disabled = false,
      label,
      description,
      icon,
      showFileList = true,
      maxFiles = 1,
      onDrop,
      files = [],
      onRemoveFile,
      accept,
      maxSize,
      ...dropzoneOptions
    },
    ref
  ) => {
    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragReject,
    } = useDropzone({
      onDrop: (acceptedFiles, fileRejections) => {
        const rejectedFiles = fileRejections.map(rejection => rejection.file);
        onDrop(acceptedFiles, rejectedFiles);
      },
      disabled,
      maxFiles,
      accept,
      maxSize,
      ...dropzoneOptions,
    });

    const hasError = !!error || isDragReject;

    return (
      <div ref={ref} className={cn('w-full', className)}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-foreground mb-2">
            {label}
          </label>
        )}

        {/* Dropzone Area */}
        <div
          {...getRootProps()}
          className={cn(
            'relative rounded-lg transition-all duration-200 cursor-pointer',
            'flex flex-col items-center justify-center',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
            DROPZONE_VARIANTS[variant],
            DROPZONE_SIZES[size],
            isDragActive && !hasError && DROPZONE_ACTIVE_CLASSES,
            hasError && DROPZONE_ERROR_CLASSES,
            disabled && DROPZONE_DISABLED_CLASSES
          )}
        >
          <input {...getInputProps()} />

          {/* Icon */}
          {icon && (
            <div className="mb-3 text-primary/70">
              {icon}
            </div>
          )}

          {/* Content */}
          <div className="text-center space-y-1">
            {isDragActive ? (
              <p className="text-sm font-medium text-primary">
                {isDragReject ? 'File type not accepted' : 'Drop files here...'}
              </p>
            ) : (
              <>
                <p className="text-sm font-medium text-foreground">
                  {description || 'Drag & drop files here, or click to select'}
                </p>
                {accept && (
                  <p className="text-xs text-muted-foreground">
                    Accepted: {Object.values(accept).flat().join(', ')}
                  </p>
                )}
                {maxSize && (
                  <p className="text-xs text-muted-foreground">
                    Max size: {(maxSize / 1024 / 1024).toFixed(2)}MB
                  </p>
                )}
                {maxFiles > 1 && (
                  <p className="text-xs text-muted-foreground">
                    Max files: {maxFiles}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="mt-2 text-sm text-danger">
            {error}
          </p>
        )}

        {/* File List */}
        {showFileList && files.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-foreground">
              Selected files ({files.length})
            </p>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary-50 dark:bg-secondary-900/50 border border-secondary-200 dark:border-secondary-800"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="flex-shrink-0 w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  {onRemoveFile && (
                    <button
                      type="button"
                      onClick={() => onRemoveFile(index)}
                      className="flex-shrink-0 ml-3 p-1 rounded-md text-danger/70 hover:text-danger hover:bg-danger/10 transition-colors"
                      aria-label={`Remove ${file.name}`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

Dropzone.displayName = 'Dropzone';

export default Dropzone;
