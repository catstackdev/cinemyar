import { useState } from 'react';
import { Dropzone } from '@/components/ui';

export function DropzoneDemo() {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>('');

  const handleDrop = (acceptedFiles: File[], rejectedFiles: File[]) => {
    if (rejectedFiles.length > 0) {
      setError('Some files were rejected. Please check file type and size.');
      return;
    }
    setError('');
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground">Dropzone Examples</h1>

      {/* Basic Dropzone */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">Basic Upload</h2>
        <Dropzone
          label="Upload File"
          description="Drag & drop a file here, or click to select"
          variant="default"
          size="md"
          showFileList={true}
          maxFiles={1}
          files={files}
          onDrop={handleDrop}
          onRemoveFile={handleRemoveFile}
          error={error}
          icon={
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          }
        />
      </section>

      {/* Image Upload */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">Image Upload</h2>
        <Dropzone
          label="Upload Images"
          description="Upload up to 5 images (PNG, JPG, GIF)"
          variant="dashed"
          size="lg"
          showFileList={true}
          maxFiles={5}
          accept={{
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
          }}
          maxSize={5 * 1024 * 1024} // 5MB
          files={files}
          onDrop={handleDrop}
          onRemoveFile={handleRemoveFile}
          icon={
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          }
        />
      </section>

      {/* Video Upload */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">Video Upload</h2>
        <Dropzone
          label="Upload Video"
          description="Upload a video file (MP4, WebM, OGG)"
          variant="solid"
          size="lg"
          showFileList={true}
          maxFiles={1}
          accept={{
            'video/*': ['.mp4', '.webm', '.ogg', '.mov'],
          }}
          maxSize={100 * 1024 * 1024} // 100MB
          files={files}
          onDrop={handleDrop}
          onRemoveFile={handleRemoveFile}
          icon={
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          }
        />
      </section>

      {/* Disabled State */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">Disabled State</h2>
        <Dropzone
          label="Disabled Upload"
          description="This dropzone is disabled"
          variant="default"
          size="md"
          disabled={true}
          onDrop={() => {}}
        />
      </section>
    </div>
  );
}
