import React, { useEffect } from "react";
import type { UpdateCategoryProps } from "./UpdateCategory.types";
import { Stack, FormField, Button, JumpingDots, Switch } from "@/components/ui";
import {
  ModalRoot,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalClose,
} from "@/components/ui/Modal";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddCategorySchema,
  type AddCategoryFormData,
} from "@/schemas/movie.schema";
import { useUpdateCategory } from "../../hooks/useUpdateCategory";

const formFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "slug", label: "Slug", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "active", label: "Active", type: "checkbox" },
] as const;

const UpdateCategory: React.FC<UpdateCategoryProps> = ({
  open,
  onOpenChange,
  category,
}) => {
  const { mutate: updateCategory, isPending } = useUpdateCategory();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<AddCategoryFormData>({
    resolver: zodResolver(AddCategorySchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: category.name,
      description: category.description,
      slug: category.slug,
      active: category.active,
    },
  });

  // Update form when category changes
  useEffect(() => {
    reset({
      name: category.name,
      description: category.description,
      slug: category.slug,
      active: category.active,
    });
  }, [category, reset]);

  const onSubmit = async (data: AddCategoryFormData) => {
    console.log("Updating category data:", data);
    updateCategory(
      { id: category.id, data },
      {
        onSuccess: () => {
          console.log("Category updated successfully");
          onOpenChange?.(false);
        },
        onError: (error) => {
          console.error("Failed to update category:", error);
        },
      }
    );
  };

  return (
    <ModalRoot open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <ModalTitle>Update Category</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Stack spacing="lg">
              {formFields.map(({ name, label, type }) => {
                const key = name as keyof AddCategoryFormData;
                return (
                  <FormField.Root
                    key={name}
                    name={name}
                    layout="stacked"
                    error={errors[key]?.message}
                  >
                    <FormField.Label>{label}</FormField.Label>

                    {type === "textarea" ? (
                      <FormField.Textarea {...register(key)} />
                    ) : type === "checkbox" ? (
                      <Controller
                        name={key}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Switch
                            checked={value as boolean}
                            onChange={onChange}
                            label=""
                          />
                        )}
                      />
                    ) : (
                      <FormField.Input
                        type={type}
                        {...register(key)}
                      />
                    )}

                    {errors[key] && (
                      <FormField.Error icon>
                        {errors[key]?.message?.toString()}
                      </FormField.Error>
                    )}
                  </FormField.Root>
                );
              })}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <ModalClose asChild>
              <Button color="secondary" variant="glass">
                Cancel
              </Button>
            </ModalClose>
            <Button type="submit" variant="glass" withPulse={isValid && false}>
              {isPending ? (
                <span>
                  Updating Category
                  <JumpingDots />
                </span>
              ) : (
                "Update Category"
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalRoot>
  );
};

export default UpdateCategory;
