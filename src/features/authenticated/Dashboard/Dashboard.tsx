import React from 'react';
import clsx from "clsx";
import styles from './Dashboard.module.css';
import type { DashboardProps } from "./Dashboard.types";

const Dashboard: React.FC<DashboardProps> = ({children, className}) => {
  return (
    <div 
      className={clsx(styles.root, className)}>
      {children}
      <h1>Dashboard Page</h1>
    </div>
  );
};

export default Dashboard;
