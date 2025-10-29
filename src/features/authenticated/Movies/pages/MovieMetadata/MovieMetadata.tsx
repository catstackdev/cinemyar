import React from 'react';
import clsx from "clsx";
import styles from './MovieMetadata.module.css';
import type { MovieMetadataProps } from "./MovieMetadata.types";

const MovieMetadata: React.FC<MovieMetadataProps> = ({children, className}) => {
  return (
    <div 
      className={clsx(styles.root, className)}>
      {children}
      <h1>MovieMetadata Page</h1>
    </div>
  );
};

export default MovieMetadata;
