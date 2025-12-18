import React from 'react';
import clsx from "clsx";
import styles from './MovieSettings.module.css';
import type { MovieSettingsProps } from "./MovieSettings.types";

const MovieSettings: React.FC<MovieSettingsProps> = ({children, className}) => {
  return (
    <div 
      className={clsx(styles.root, className)}>
      {children}
      <h1>MovieSettings Page</h1>
    </div>
  );
};

export default MovieSettings;
