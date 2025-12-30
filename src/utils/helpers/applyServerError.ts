import type { ApiError } from "@/shared/types";
import type { AxiosError } from "axios";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

export const applyServerErrors = <T extends FieldValues>(
  error: AxiosError<ApiError>,
  setError: UseFormSetError<T>,
) => {
  // Only handle validation errors
  if (error?.response?.status !== 422) return;

  const details = error.response.data?.details;

  if (!details || typeof details !== "object" || !("errors" in details)) {
    console.warn("422 error without validation details", details);
    return;
  }

  const errors = details.errors;

  Object.entries(errors).forEach(([key, messages]) => {
    if (!Array.isArray(messages) || messages.length === 0) return;

    setError(key as Path<T>, {
      type: "manual",
      message: messages[0],
    });
  });
};
