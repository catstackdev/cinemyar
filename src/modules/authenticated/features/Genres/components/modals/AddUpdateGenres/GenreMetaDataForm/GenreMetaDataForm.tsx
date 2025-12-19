import React from "react";
import type { GenreMetaDataFormProps } from "./GenreMetaDataForm.types";
import { Stack, FormField } from "@/components/ui";
import { formFields } from "../AddUpdateGenres.models";
import type { AddGenreFormData } from "@/schemas/movie.schema";
import { GenresParentSelect } from "@/modules/domain/genres/components";

const GenreMetaDataForm: React.FC<GenreMetaDataFormProps> = ({
  register,
  errors,
  control,
}) => {
  return (
    <Stack spacing="lg">
      {formFields.map(({ name, label, type, required }) => {
        const key = name as keyof AddGenreFormData;
        return (
          <FormField.Root
            key={name}
            name={name}
            layout="stacked"
            error={errors[key]?.message}
          >
            <FormField.Label required={required}>{label}</FormField.Label>
            {type === "textarea" ? (
              <FormField.Textarea {...register(key)} />
            ) : type === "select" ? (
              <GenresParentSelect name={key} control={control} />
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
  );
};

export default GenreMetaDataForm;
