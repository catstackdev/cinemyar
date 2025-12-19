import React, { useState } from "react";
import { cn } from "@/utils/helpers/classNames";
import styles from "./StepTwo.module.css";
import type { StepTwoProps } from "./StepTwo.types";
import { Dropzone } from "@/components/ui";

const StepTwo: React.FC<StepTwoProps> = ({ children, className, ...rest }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");

  const handleDrop = (acceptedFiles: File[], rejectedFiles: File[]) => {
    if (rejectedFiles.length > 0) {
      setError("Some files were rejected. Please check file type and size.");
      return;
    }
    setError("");
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={cn(styles.root, className)} {...rest}>
      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          Image Upload
        </h2>
        <Dropzone
          label="Upload Images"
          description="Upload up to 5 images (PNG, JPG, GIF)"
          variant="dashed"
          size="lg"
          showFileList={true}
          maxFiles={5}
          accept={{
            "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
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
      {children}
    </div>
  );
};

export default StepTwo;
