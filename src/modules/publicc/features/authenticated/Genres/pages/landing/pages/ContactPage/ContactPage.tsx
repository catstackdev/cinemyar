import React from 'react';
import clsx from "clsx";
import styles from './ContactPage.module.css';
import type { ContactPageProps } from "./ContactPage.types";

const ContactPage: React.FC<ContactPageProps> = ({children, className}) => {
  return (
    <div 
      className={clsx(styles.root, className)}>
      {children}
      <h1>ContactPage Page</h1>
    </div>
  );
};

export default ContactPage;
