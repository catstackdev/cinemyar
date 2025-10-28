import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import type { MovieLayoutProps } from "./MovieLayout.types";
import { Button } from "@/components/ui";
import { AddNewMovieModal } from "../../components";

const MovieLayout: React.FC<MovieLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <AddNewMovieModal open={open} onOpenChange={setOpen} />
      {children}
      <Outlet />
    </div>
  );
};

export default MovieLayout;
