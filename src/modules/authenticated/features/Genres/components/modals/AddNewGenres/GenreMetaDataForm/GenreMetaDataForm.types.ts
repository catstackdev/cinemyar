import type { AddGenreFormData } from "@/schemas/movie.schema";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";

export interface GenreMetaDataFormProps {
  register: UseFormRegister<AddGenreFormData>;
  errors: FieldErrors<AddGenreFormData>;
  control: Control<AddGenreFormData>;
}
