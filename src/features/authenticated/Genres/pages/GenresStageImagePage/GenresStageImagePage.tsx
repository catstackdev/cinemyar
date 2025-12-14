import React from 'react';
import clsx from "clsx";
import styles from './GenresStageImagePage.module.css';
import type { GenresStageImagePageProps } from "./GenresStageImagePage.types";

const GenresStageImagePage: React.FC<GenresStageImagePageProps> = ({children, className}) => {
  return (
    <div 
      className={clsx(styles.root, className)}>
      {children}
      <h1>GenresStageImagePage Page</h1>
    </div>
  );
};

export default GenresStageImagePage;
