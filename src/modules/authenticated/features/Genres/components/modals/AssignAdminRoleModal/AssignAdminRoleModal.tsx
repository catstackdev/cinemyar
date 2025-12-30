import React from "react";
import { cn } from "@/utils/helpers/classNames";
import styles from "./AssignAdminRoleModal.module.css";
import type { AssignAdminRoleModalProps } from "./AssignAdminRoleModal.types";

const AssignAdminRoleModal: React.FC<AssignAdminRoleModalProps> = ({
  children, className, ...rest
}) => {
  
  return (
    <div
      className={cn(styles.root, className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default AssignAdminRoleModal;
