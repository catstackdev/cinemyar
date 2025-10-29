import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import type { MovieLayoutProps } from "./MovieLayout.types";
import { Button, Card, Container } from "@/components/ui";
import { TabsHorizontal } from "@/components/ui/TabsHorizontal";
import { AddNewMovieModal } from "../../components";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { PlusIcon } from "lucide-react";
import { movieNavSections } from "./nav";

const MovieLayout: React.FC<MovieLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Container size="full" className="relative p-4 min-h-full">
      <div className="h-1/2 bg-primary-200 absolute left-0 right-0 -z-1 top-0"></div>
      <AddNewMovieModal open={open} onOpenChange={setOpen} />
      <Card className="w-full">
        <CardHeader
          divided
          className="flex flex-row items-center gap-4 justify-between"
        >
          <div className="space-y-2">
            <CardTitle>Movies Management</CardTitle>
            <CardDescription>
              Manage your movie library, encoding queue, and analytics
            </CardDescription>
          </div>
          <Button
            onClick={() => setOpen(true)}
            leftIcon={<PlusIcon className="w-4 h-4" />}
            size="sm"
          >
            Add New Movie
          </Button>
        </CardHeader>

        <CardContent className="p-6">
          <TabsHorizontal sections={movieNavSections} variant="underline" />

          <div className="mt-6">
            <Outlet />
            {children}
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MovieLayout;
