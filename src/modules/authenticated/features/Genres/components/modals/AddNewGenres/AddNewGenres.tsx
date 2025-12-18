import React, { useEffect, useState } from "react";
import type { AddNewGenresProps } from "./AddNewGenres.types";
import {
  ModalRoot,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "@/components/ui/Modal";
import { useForm } from "react-hook-form";
import { AddGenreSchema, type AddGenreFormData } from "@/schemas/movie.schema";
import {
  Button,
  FormField,
  Stack,
  Stepper,
  StepperContent,
  StepperStep,
} from "@/components/ui";
import { CheckCircle, FileText, Upload } from "lucide-react";
import {
  useAdminAddGenre,
  useAdminUpdateGenre,
} from "../../../hooks/useAdminGenres";
import type { ApiResponse, AdminGenreSerialized } from "@/shared/types/types";
import { applyServerErrors } from "@/utils/helpers/applyServerError";
import { slugify } from "../../../utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { GenresParentSelect } from "@/modules/domain/genres/components";
import { formFields } from "./AddNewGenres.models";

const AddNewGenres: React.FC<AddNewGenresProps> = ({
  children,
  open,
  onOpenChange,
}) => {
  const { mutate: addGenre, isPending } = useAdminAddGenre();
  const { mutate: updateGenre, isPending: isPendingUpdate } =
    useAdminUpdateGenre();
  const [newGenre, setNewGenre] = useState<AdminGenreSerialized | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isDirty, isSubmitting },
    trigger,
    watch,
    setValue,
    setError,
    getValues,
  } = useForm<AddGenreFormData>({
    resolver: zodResolver(AddGenreSchema),
    defaultValues: {
      name: newGenre?.name ?? "",
      slug: newGenre?.slug ?? "",
      parentId: newGenre?.parentId ?? "",
      description: newGenre?.description ?? "",
    },
  });
  const watchedName = watch("name");
  useEffect(() => {
    if (!newGenre && watchedName) {
      const generatedSlug = slugify(watchedName);
      setValue("slug", generatedSlug, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [watchedName, setValue, newGenre]);
  useEffect(() => {
    if (newGenre) {
      reset(
        {
          name: newGenre.name,
          slug: newGenre.slug,
          parentId: newGenre.parentId,
          description: newGenre.description ?? "",
        },
        {
          keepDefaultValues: false, // Ensures these become the new "base" values
        },
      );
    }
  }, [newGenre, reset]);

  const handleStep1Submit = async (data: AddGenreFormData) => {
    if (newGenre) {
      if (!isDirty) {
        setActiveStep(1);
        return;
      }
      updateGenre(
        { id: newGenre.id, data },
        {
          onSuccess: (response: ApiResponse<AdminGenreSerialized>) => {
            console.log("response", response);
            setNewGenre(response?.data);
            setActiveStep(1);
          },
          onError: (error: any) => {
            console.log("error", error);
            applyServerErrors<AddGenreFormData>(error, setError);
          },
        },
      );
    } else {
      addGenre(data, {
        onSuccess: (response: ApiResponse<AdminGenreSerialized>) => {
          console.log("response", response);
          setNewGenre(response?.data);
          reset();
          setActiveStep(1);
        },
        onError: (error: any) => {
          console.log("error", error);
          applyServerErrors<AddGenreFormData>(error, setError);
        },
      });
    }
  };
  const handleStep2Submit = async () => {
    if (!newGenre) return; // Should not happen if flow is correct
    const { iconFile, bannerFile } = getValues();

    // ** API Call for Upload **
    // const uploadPayload = new FormData();
    // uploadPayload.append('icon', iconFile[0]);
    // await uploadFiles(newCategoryId, uploadPayload);
    // 6. Advance the step on success
    setActiveStep(2);
  };
  const handleNext = async () => {
    if (activeStep === 0) {
      // Step 0 requires validation before submitting/moving
      // const isValid = await trigger(["name", "description", "slug"]);
      if (isValid) {
        handleSubmit(handleStep1Submit)();
      }
    } else if (activeStep === 1) {
      handleStep2Submit();
    } else if (activeStep === 2) {
      reset();
      onOpenChange?.(false);
    }
  };
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((v) => v - 1);
    }
  };

  return (
    <ModalRoot open={open} onOpenChange={onOpenChange}>
      <ModalContent className="border border-primary/50" size="xl">
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <ModalHeader>
          <ModalTitle>Add New Genre </ModalTitle>
        </ModalHeader>
        <ModalBody>
          {children}
          <Stepper
            activeStep={activeStep}
            onStepClick={setActiveStep}
            allowClickNavigation
            size="md"
            color="primary"
          >
            <StepperStep
              label="Meta Data"
              description="Name, slug, and details"
              icon={<FileText className="w-5 h-5" />}
            >
              <StepperContent>
                <div className="p-4 bg-muted/50 rounded-lg overflow-auto max-h-[calc(100vh-400px)]">
                  <h3 className="font-semibold mb-4">Create Your Account</h3>

                  <Stack spacing="lg">
                    {formFields.map(({ name, label, type, required }) => {
                      const key = name as keyof AddGenreFormData;
                      return (
                        <FormField.Root
                          key={name}
                          name={name}
                          layout="stacked"
                          error={errors[key]?.message}
                          disabled={
                            (!!newGenre && name == "slug") || isSubmitting
                          }
                        >
                          <FormField.Label required={required}>
                            {label}
                          </FormField.Label>
                          {type === "textarea" ? (
                            <FormField.Textarea {...register(key)} />
                          ) : type === "select" ? (
                            <GenresParentSelect name={key} control={control} />
                          ) : (
                            <FormField.Input
                              type={type}
                              {...register(
                                key,
                                type === "number"
                                  ? { valueAsNumber: true }
                                  : {},
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
                </div>
              </StepperContent>
            </StepperStep>

            <StepperStep
              label="Upload Files"
              description="Icon and Banner (Optional)"
              icon={<Upload className="w-5 h-5" />}
            >
              <StepperContent>
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-4">Shopping Cart</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Review your items
                  </p>
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </StepperContent>
            </StepperStep>

            <StepperStep
              label="Complete"
              description="Order placed"
              icon={<CheckCircle className="w-5 h-5" />}
            >
              <StepperContent>
                <div className="p-6 bg-success/10 border border-success/30 rounded-lg text-center">
                  <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                  <h3 className="font-semibold text-success mb-2">Success!</h3>
                  <p className="text-sm text-muted-foreground">
                    Your order has been placed successfully.
                  </p>
                </div>
              </StepperContent>
            </StepperStep>
          </Stepper>
        </ModalBody>
        <ModalFooter>
          {/* ... Modal Footer content remains the same ... */}
          {/* <ModalClose asChild> */}
          {/* </ModalClose> */}
          <Button
            color="secondary"
            variant="glass"
            disabled={activeStep === 0 || isPending}
            onClick={handleBack}
          >
            Previous
          </Button>
          {/* <Button */}
          {/*   type="submit" */}
          {/*   variant="glass" */}
          {/*   withPulse={isValid && false} */}
          {/*   onClick={() => setActiveStep((v) => (v < 2 ? v + 1 : v))} */}
          {/* > */}
          {/*   Next */}
          {/* </Button> */}
          {activeStep < 2 ? (
            <Button
              type="button" // Important! Don't submit the whole form
              variant="glass"
              withPulse={!isPending}
              onClick={handleNext} // Calls the logic that validates, submits, or advances
              disabled={isPending}
            >
              {activeStep === 0
                ? newGenre
                  ? "Update & Next"
                  : "Save & Next"
                : "Complete Upload"}
            </Button>
          ) : (
            // Final close button after success
            <Button
              type="button"
              variant="glass"
              color="success"
              onClick={handleNext} // This runs the final reset/close
            >
              Finish
            </Button>
          )}
        </ModalFooter>
        {/* </form> */}
      </ModalContent>
    </ModalRoot>
  );
};

export default AddNewGenres;
