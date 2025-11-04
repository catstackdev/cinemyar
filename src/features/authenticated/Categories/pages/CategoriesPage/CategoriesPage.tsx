import {
  categoriesAPI,
  type CategoryResponse,
  type Category,
} from "@/api/categories.api";
import {
  Button,
  Card,
  Chip,
  Container,
  EmptyState,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { categoriesQueryKey } from "../../hooks/categoriesQueryKey";
import type { CategoriesPageProps } from "./CategoriesPage.types";
import type { ResponseType } from "@/types/response.types";
import { formatDate } from "@/utils/helpers";
import { PlusIcon, TrashIcon, Edit } from "lucide-react";
import { AddNewCategory, UpdateCategory } from "../../components";
import { useDeleteCategory } from "../../hooks/useDeleteCategories";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";

const CategoriesPage: React.FC<CategoriesPageProps> = ({ children }) => {
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();
  const navigate = useNavigate();
  const initialData = useLoaderData<ResponseType<CategoryResponse>>();
  const [openNewModal, setOpenNewModal] = useState(false);
  const [openUpdateModal, setUpdateNewModal] = useState(false);
  const [categoryToUpdate, setcategoryToUpdate] = useState<Category>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );

  const { data } = useQuery<ResponseType<CategoryResponse>>({
    queryKey: categoriesQueryKey(),
    queryFn: () => categoriesAPI.getCategories(),
    initialData,
  });

  const handleUpdateClick = (category: Category, e: React.MouseEvent) => {
    e.stopPropagation();
    setcategoryToUpdate(category);
    setUpdateNewModal(true);
  };

  const handleDeleteClick = (category: Category, e: React.MouseEvent) => {
    e.stopPropagation();
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    deleteCategory(categoryToDelete.id, {
      onSuccess: () => {
        console.log("Category deleted successfully");
        setDeleteDialogOpen(false);
        setCategoryToDelete(null);
      },
      onError: (error) => {
        console.error("Failed to delete category:", error);
      },
    });
  };

  return (
    <Container size="full" className="relative p-4 min-h-full">
      <AddNewCategory open={openNewModal} onOpenChange={setOpenNewModal} />
      {categoryToUpdate && (
        <UpdateCategory
          open={openUpdateModal}
          onOpenChange={setUpdateNewModal}
          category={categoryToUpdate}
        />
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        description={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />

      <Card className="w-full glass border-border/50 shadow-xl">
        <CardHeader
          divided
          className="flex flex-row items-center gap-4 justify-between bg-gradient-to-r from-primary/5 via-transparent to-info/5"
        >
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
              Categories Management
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage and organize your movie categories
            </CardDescription>
          </div>
          <Button
            onClick={() => setOpenNewModal(true)}
            leftIcon={<PlusIcon className="w-4 h-4" />}
            size="sm"
            variant="glass"
            className="shadow-md hover:shadow-lg transition-shadow"
          >
            Add New Category
          </Button>
        </CardHeader>

        <CardContent className="p-6">
          <div className="w-full overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm shadow-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.map((category) => (
                  <TableRow
                    key={category.id}
                    onClick={() =>
                      navigate(`/authenticated/categories/${category.id}`)
                    }
                    className="cursor-pointer"
                  >
                    <TableCell className="font-semibold group-hover:text-primary">
                      {category.name}
                    </TableCell>
                    <TableCell>
                      <Chip
                        variant={category.active ? "success" : "default"}
                        className="font-sans text-xs"
                      >
                        {category.active ? "Active" : "Inactive"}
                      </Chip>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground group-hover:text-foreground">
                      {category.description}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {formatDate(category.createdAt)}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {formatDate(category.updatedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="glass"
                          color="primary"
                          size="xs"
                          onClick={(e: React.MouseEvent) =>
                            handleUpdateClick(category, e)
                          }
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <Edit className="size-4" />
                        </Button>
                        <Button
                          variant="glass"
                          color="danger"
                          size="xs"
                          onClick={(e: React.MouseEvent) =>
                            handleDeleteClick(category, e)
                          }
                          isLoading={
                            isDeleting && categoryToDelete?.id === category.id
                          }
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <TrashIcon className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {!!data?.data && data?.data?.length === 0 && (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={6} className="h-32">
                      <EmptyState title="No categories found" />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {children}
        </CardContent>
      </Card>
    </Container>
  );
};

export default CategoriesPage;
