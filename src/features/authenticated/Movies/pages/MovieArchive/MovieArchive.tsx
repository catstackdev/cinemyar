import React from 'react';
import clsx from "clsx";
import styles from './MovieArchive.module.css';
import type { MovieArchiveProps } from "./MovieArchive.types";

const MovieArchive: React.FC<MovieArchiveProps> = ({children, className}) => {
  return (
    <div 
      className={clsx(styles.root, className)}>
      {children}
      <h1>MovieArchive Page</h1>
    </div>
  );
};

export default MovieArchive;
