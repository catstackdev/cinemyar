import React from 'react';
import clsx from "clsx";
import styles from './MovieEncoding.module.css';
import type { MovieEncodingProps } from "./MovieEncoding.types";

const MovieEncoding: React.FC<MovieEncodingProps> = ({children, className}) => {
  return (
    <div 
      className={clsx(styles.root, className)}>
      {children}
      <h1>MovieEncoding Page</h1>
    </div>
  );
};

export default MovieEncoding;
