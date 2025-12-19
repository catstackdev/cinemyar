import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { AddGenreFormData } from "@/schemas/movie.schema";
import type { AdminGenreSerialized } from "@/shared/types/types";

export interface GenreMetaDataStepProps {
  register: UseFormRegister<AddGenreFormData>;
  control: Control<AddGenreFormData>;
  errors: FieldErrors<AddGenreFormData>;
  touchedFields: Partial<Record<keyof AddGenreFormData, boolean>>;
  dirtyFields: Partial<Record<keyof AddGenreFormData, boolean>>;
  isSubmitting: boolean;
  isPending: boolean;
  isPendingUpdate: boolean;
  newGenre: AdminGenreSerialized | null;
  onNameBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}
