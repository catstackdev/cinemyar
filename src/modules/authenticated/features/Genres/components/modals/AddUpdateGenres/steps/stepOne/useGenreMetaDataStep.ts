import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddGenreSchema, type AddGenreFormData } from "@/schemas/movie.schema";
import type { AdminGenreSerialized, ApiResponse } from "@/shared/types";
import { slugify } from "../../../../../utils/helpers";
import { applyServerErrors } from "@/utils/helpers/applyServerError";
import {
  useAdminAddGenre,
  useAdminUpdateGenre,
} from "../../../../../hooks/useAdminGenres";
import type { GenreDetailData } from "@/shared/types/genre";

export interface UseGenreMetaDataStepProps {
  open?: boolean;
  genre?: GenreDetailData | null;
  newGenre: GenreDetailData | null;
  onSuccess?: (genre: AdminGenreSerialized) => void;
}

export const useGenreMetaDataStep = ({
  open,
  genre,
  newGenre,
  onSuccess,
}: UseGenreMetaDataStepProps) => {
  const { mutate: addGenre, isPending } = useAdminAddGenre();
  const { mutate: updateGenre, isPending: isPendingUpdate } =
    useAdminUpdateGenre();

  const dataSource = newGenre || genre;
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {
      errors,
      isValid,
      isDirty,
      isSubmitting,
      touchedFields,
      dirtyFields,
    },
    setValue,
    setError,
  } = useForm<AddGenreFormData>({
    mode: "onChange", // Mark as touched + validate on every change
    resolver: zodResolver(AddGenreSchema),
    defaultValues: {
      name: dataSource?.name ?? "",
      slug: dataSource?.slug ?? "",
      parentId: dataSource?.parent?.id ?? "",
      description: dataSource?.description ?? "",
    },
  });
  useEffect(() => {
    if (open) {
      const dataSource = newGenre || genre;
      reset({
        name: dataSource?.name ?? "",
        slug: dataSource?.slug ?? "",
        parentId: dataSource?.parent?.id ?? "",
        description: dataSource?.description ?? "",
      });
    }
  }, [open, newGenre, genre]);

  // Auto-generate slug from name on blur
  const handleNameBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const nameValue = e.target.value;
      if (!newGenre && nameValue) {
        const generatedSlug = slugify(nameValue);
        setValue("slug", generatedSlug, {
          shouldTouch: true,
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    },
    [newGenre, setValue],
  );

  // Submit handler for Step 1
  const onSubmit = async (data: AddGenreFormData) => {
    const payload = {
      ...data,
      parentId:
        data.parentId && data.parentId.trim() !== "" ? data.parentId : null,
    };

    if (newGenre) {
      if (!isDirty) {
        onSuccess?.(newGenre);
        return;
      }

      updateGenre(
        { id: newGenre.id, data: payload },
        {
          onSuccess: (response: ApiResponse<AdminGenreSerialized>) => {
            onSuccess?.(response.data);
          },
          onError: (error: any) => {
            console.log("error", error);
            applyServerErrors<AddGenreFormData>(error, setError);
          },
        },
      );
    } else {
      // CREATE mode
      addGenre(payload, {
        onSuccess: (response: ApiResponse<AdminGenreSerialized>) => {
          onSuccess?.(response.data);
        },
        onError: (error: any) => {
          console.log("error", error);
          applyServerErrors<AddGenreFormData>(error, setError);
        },
      });
    }
  };

  return {
    // Form state
    register,
    handleSubmit,
    control,
    reset,
    errors,
    isValid,
    isDirty,
    isSubmitting,
    touchedFields,
    dirtyFields,
    setValue,
    setError,

    // Mutation state
    isPending,
    isPendingUpdate,

    // Handlers
    handleNameBlur,
    onSubmit,
  };
};
