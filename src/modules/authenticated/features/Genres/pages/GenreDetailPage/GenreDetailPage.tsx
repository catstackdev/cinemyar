import React from "react";
import clsx from "clsx";
import styles from "./GenreDetailPage.module.css";
import type { GenreDetailPageProps } from "./GenreDetailPage.types";
import { DropzoneDemo } from "@/demo/ui/dropzone";

const GenreDetailPage: React.FC<GenreDetailPageProps> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx(styles.root, className)}>
      {children}
      <h1>GenreDetailPage Page</h1>
      <DropzoneDemo />
    </div>
  );
};

export default GenreDetailPage;
