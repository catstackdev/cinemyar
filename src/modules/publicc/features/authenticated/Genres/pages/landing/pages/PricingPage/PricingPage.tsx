import React from 'react';
import clsx from "clsx";
import styles from './PricingPage.module.css';
import type { PricingPageProps } from "./PricingPage.types";

const PricingPage: React.FC<PricingPageProps> = ({children, className}) => {
  return (
    <div 
      className={clsx(styles.root, className)}>
      {children}
      <h1>PricingPage Page</h1>
    </div>
  );
};

export default PricingPage;
