import { Button, FormField, JumpingDots, Stack } from "@/components/ui";
import {
  ModalRoot,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalClose,
} from "@/components/ui/Modal";
import type { AddNewMovieModalProps } from "./AddNewMovieModal.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formFields } from "./formfields.model";
import { useAddMovie } from "../../hooks/useAddMovie";
import {
  AddNewMovieSchema,
  type AddNewMovieFormData,
} from "./schemas/AddNewMovie.schema";

const AddNewMovieModal: React.FC<AddNewMovieModalProps> = ({
  children,
  open,
  onOpenChange,
}) => {
  const { mutate: addMovie, isPending } = useAddMovie();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddNewMovieFormData>({
    // resolver: zodResolver(AddNewMovieSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      genre: "",
      releaseYear: new Date().getFullYear(), // number
      duration: 0, // number
      poster: undefined,
      video: undefined,
      trailer: undefined,
    },
  });

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof AddNewMovieFormData,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // optional: setValue(field, file); if you want to attach it to the form
    console.log(`Uploading ${field}:`, file.name);
  };

  const onSubmit = async (data: AddNewMovieFormData) => {
    console.log("data", data);
    addMovie(data);
    // dispatch(loginAction({ ...data, rememberMe }));
  };
  return (
    <ModalRoot open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <ModalTitle>Add New Movie</ModalTitle>
          </ModalHeader>
          <ModalBody>
            {children}
            <Stack spacing="lg">
              {formFields.map(({ name, label, type }) => {
                const key = name as keyof AddNewMovieFormData;
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

              {/* File inputs separate if custom handling needed */}
              <FormField.Root name="poster" layout="stacked">
                <FormField.Label>Poster Image</FormField.Label>
                <FormField.Input
                  type="file"
                  onChange={(e) => handleFileUpload(e, "poster")}
                />
              </FormField.Root>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <ModalClose asChild>
              <Button color="secondary" variant="default">
                Cancel
              </Button>
            </ModalClose>
            <Button type="submit" variant="default">
              {isPending ? (
                <span>
                  Adding New Movie
                  <JumpingDots />
                </span>
              ) : (
                "Add New Movie"
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalRoot>
  );
};

export default AddNewMovieModal;
