import React from "react";
import clsx from "clsx";
import styles from "./AddNewGenres.module.css";
import type { AddNewGenresProps } from "./AddNewGenres.types";

const AddNewGenres: React.FC<AddNewGenresProps> = ({
  children, className, ...rest
}) => {
  
  return (
    <div
      className={clsx(styles.root, className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default AddNewGenres;
