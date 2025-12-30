import React from 'react';
import clsx from "clsx";
import styles from './RoleDetailPage.module.css';
import type { RoleDetailPageProps } from "./RoleDetailPage.types";

const RoleDetailPage: React.FC<RoleDetailPageProps> = ({children, className}) => {
  return (
    <div 
      className={clsx(styles.root, className)}>
      {children}
      <h1>RoleDetailPage Page</h1>
    </div>
  );
};

export default RoleDetailPage;
