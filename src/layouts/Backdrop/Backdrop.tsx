import React from "react";
import type { BackdropProps } from "./Backdrop.types";
import { useSidebar } from "@/contexts/SidebarContext";

const Backdrop: React.FC<BackdropProps> = ({
  children,
  className,
  ...rest
}) => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
      onClick={toggleMobileSidebar}
      {...rest}
    />
  );
};

export default Backdrop;
