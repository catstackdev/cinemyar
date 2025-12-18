import React from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/utils/helpers";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";
import type { PublicLayoutProps } from "./PublicLayout.types";

const PublicLayout: React.FC<PublicLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("min-h-screen flex flex-col", className)}>
      <PublicHeader />
      
      <main className="flex-1 pt-16 md:pt-20">
        {children || <Outlet />}
      </main>
      
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;