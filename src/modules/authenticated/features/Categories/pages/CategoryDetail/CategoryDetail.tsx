import React, { useState } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  Chip,
  Container,
  Badge,
} from "@/components/ui";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { categoriesAPI, type Category } from "@/api/categories.api";
import type { ResponseType } from "@/types/response.types";
import { formatDate } from "@/utils/helpers";
import { ArrowLeft, Edit, Trash2, Calendar, Hash, FileText, ToggleLeft } from "lucide-react";
import { UpdateCategory } from "../../components";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { useDeleteCategory } from "../../hooks/useDeleteCategories";
import type { CategoryDetailProps } from "./CategoryDetail.types";

const CategoryDetail: React.FC<CategoryDetailProps> = ({ children }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const initialData = useLoaderData<ResponseType<Category>>();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data, isLoading } = useQuery<ResponseType<Category>>({
    queryKey: ["categories", id],
    queryFn: () => categoriesAPI.getCategory(id!),
    initialData,
    enabled: !!id,
  });

  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  const category = data?.data;

  const handleDelete = () => {
    if (!id) return;
    deleteCategory(id, {
      onSuccess: () => {
        navigate("/authenticated/categories");
      },
      onError: (error) => {
        console.error("Failed to delete category:", error);
      },
    });
  };

  if (isLoading) {
    return (
      <Container size="full" className="p-4">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Container>
    );
  }

  if (!category) {
    return (
      <Container size="full" className="p-4">
        <Card className="glass border-border/50">
          <CardContent className="p-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Category Not Found</h2>
            <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/authenticated/categories")} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Categories
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container size="full" className="p-4 min-h-full">
      <UpdateCategory
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
        category={category}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Category"
        description={`Are you sure you want to delete "${category.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />

      {/* Header with Actions */}
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate("/authenticated/categories")}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          className="hover:bg-primary/10"
        >
          Back to Categories
        </Button>
        <div className="flex gap-2">
          <Button
            variant="glass"
            color="primary"
            size="sm"
            onClick={() => setUpdateDialogOpen(true)}
            leftIcon={<Edit className="w-4 h-4" />}
          >
            Edit
          </Button>
          <Button
            variant="glass"
            color="danger"
            size="sm"
            onClick={() => setDeleteDialogOpen(true)}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info Card */}
        <div className="lg:col-span-2">
          <Card className="glass border-border/50 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-primary/5 via-transparent to-info/5">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent mb-2">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    Category Details and Information
                  </CardDescription>
                </div>
                <Chip variant={category.active ? "success" : "default"} className="text-sm">
                  {category.active ? "Active" : "Inactive"}
                </Chip>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  <FileText className="w-4 h-4" />
                  <span>Description</span>
                </div>
                <p className="text-foreground/90 leading-relaxed">
                  {category.description || "No description provided"}
                </p>
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  <Hash className="w-4 h-4" />
                  <span>Slug</span>
                </div>
                <code className="block px-3 py-2 bg-muted/30 rounded-lg font-mono text-sm text-foreground border border-border/30">
                  {category.slug}
                </code>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  <ToggleLeft className="w-4 h-4" />
                  <span>Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={category.active ? "success" : "default"}>
                    {category.active ? "Active" : "Inactive"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {category.active
                      ? "This category is currently visible and active"
                      : "This category is currently hidden"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Metadata */}
        <div className="space-y-6">
          {/* Dates Card */}
          <Card className="glass border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Timestamps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Created At
                </p>
                <p className="font-mono text-sm text-foreground">
                  {formatDate(category.createdAt)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Updated At
                </p>
                <p className="font-mono text-sm text-foreground">
                  {formatDate(category.updatedAt)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card className="glass border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="text-sm text-muted-foreground">Category ID</span>
                <code className="text-xs font-mono text-primary">{category.id}</code>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={category.active ? "success" : "default"} size="sm">
                  {category.active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Slug Length</span>
                <span className="text-sm font-medium text-foreground">{category.slug.length} chars</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {children}
    </Container>
  );
};

export default CategoryDetail;
