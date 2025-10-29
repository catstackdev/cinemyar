import React from 'react';
import clsx from "clsx";
import styles from './MovieAnalytics.module.css';
import type { MovieAnalyticsProps } from "./MovieAnalytics.types";

const MovieAnalytics: React.FC<MovieAnalyticsProps> = ({children, className}) => {
  return (
    <div 
      className={clsx(styles.root, className)}>
      {children}
      <h1>MovieAnalytics Page</h1>
    </div>
  );
};

export default MovieAnalytics;
