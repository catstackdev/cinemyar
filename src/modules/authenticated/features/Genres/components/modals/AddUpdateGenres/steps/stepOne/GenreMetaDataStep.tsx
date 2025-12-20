import React from "react";
import type { GenreMetaDataStepProps } from "./GenreMetaDataStep.types";
import { FormField, Loading, Stack } from "@/components/ui";
import { GenresParentSelect } from "@/modules/domain/genres/components";
import type { AddGenreFormData } from "@/schemas/movie.schema";
import { formFields } from "../../AddUpdateGenres.models";

const GenreMetaDataStep: React.FC<GenreMetaDataStepProps> = ({
  register,
  control,
  errors,
  touchedFields,
  dirtyFields,
  isSubmitting,
  isPending,
  isPendingUpdate,
  newGenre,
  isLoading,
  onNameBlur,
}) => {
  const isInitialLoading = isLoading && !newGenre;
  return (
    <div className="p-4 bg-muted/50 rounded-lg overflow-auto max-h-[calc(100vh-330px)]">
      <h3 className="font-semibold mb-4">Fill Below</h3>

      <Stack spacing="lg">
        {formFields.map(({ name, label, type, required }) => {
          const key = name as keyof AddGenreFormData;

          // Check if we are in the initial loading state

          return (
            <FormField.Root
              key={name}
              name={name}
              layout="stacked"
              error={errors[key]?.message as string | undefined}
              disabled={
                (!!newGenre && name === "slug") ||
                isSubmitting ||
                isPending ||
                isPendingUpdate
              }
            >
              <FormField.Label required={required}>{label}</FormField.Label>

              {isInitialLoading ? (
                /* SKELETON STATE */
                <Loading
                  type={type === "textarea" ? "skeleton-rect" : "skeleton-text"}
                  size="xl"
                  count={1}
                  className={type === "textarea" ? "h-32" : "h-10"} // Match your input heights
                  inline
                />
              ) : (
                /* ACTUAL INPUTS */
                <>
                  {type === "textarea" ? (
                    <FormField.Textarea
                      touched={touchedFields[key]}
                      dirty={dirtyFields[key]}
                      {...register(key)}
                    />
                  ) : type === "select" ? (
                    <GenresParentSelect
                      name={key}
                      control={control}
                      isDisabled={isPending || isPendingUpdate}
                    />
                  ) : (
                    <FormField.Input
                      type={type}
                      touched={touchedFields[key]}
                      dirty={dirtyFields[key]}
                      {...register(key)}
                      onBlur={(e) => {
                        if (name === "name") {
                          onNameBlur(e);
                        }
                      }}
                    />
                  )}
                </>
              )}

              {errors[key] && !isInitialLoading && (
                <FormField.Error icon>
                  {errors[key]?.message?.toString()}
                </FormField.Error>
              )}
            </FormField.Root>
          );
        })}
      </Stack>
    </div>
  );
};

export default GenreMetaDataStep;
