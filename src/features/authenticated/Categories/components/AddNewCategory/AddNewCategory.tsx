import React from "react";
import type { AddNewCategoryProps } from "./AddNewCategory.types";
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
import { useAddCategory } from "../../hooks/useAddCategories";
import { formFields } from "./AddNewCategory.models";

const AddNewCategory: React.FC<AddNewCategoryProps> = ({
  children,
  open,
  onOpenChange,
}) => {
  const { mutate: addCategory, isPending } = useAddCategory();
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
      name: "",
      description: "",
      slug: "",
      active: false,
    },
  });

  const onSubmit = async (data: AddCategoryFormData) => {
    console.log("Submitting category data:", data);
    addCategory(data, {
      onSuccess: () => {
        console.log("Category added successfully");
        reset();
        onOpenChange?.(false);
      },
      onError: (error) => {
        console.error("Failed to add category:", error);
      },
    });
  };
  return (
    <ModalRoot open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <ModalTitle>Add New Category</ModalTitle>
          </ModalHeader>
          <ModalBody>
            {children}
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
                        {...register(
                          key,
                          type === "number" ? { valueAsNumber: true } : {},
                        )}
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
                  Adding New Category
                  <JumpingDots />
                </span>
              ) : (
                "Add New Category"
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalRoot>
  );
};

export default AddNewCategory;
