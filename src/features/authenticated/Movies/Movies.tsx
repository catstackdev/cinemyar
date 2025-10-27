import React from 'react';
import clsx from "clsx";
import styles from './Movies.module.css';
import type { MoviesProps } from "./Movies.types";

const Movies: React.FC<MoviesProps> = ({children, className}) => {
  return (
    <div 
      className={clsx(styles.root, className)}>
      {children}
      <h1>Movies Page</h1>
    </div>
  );
};

export default Movies;
