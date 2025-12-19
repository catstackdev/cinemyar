import React, { useState, useEffect } from "react";
import type { AddNewGenresProps } from "./AddUpdateGenres.types";
import {
  ModalRoot,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "@/components/ui/Modal";
import {
  Button,
  Stepper,
  StepperContent,
  StepperStep,
} from "@/components/ui";
import { CheckCircle, FileText, Upload } from "lucide-react";
import type { AdminGenreSerialized } from "@/shared/types/types";
import { GenreMetaDataStep, useGenreMetaDataStep } from "./steps";

const AddNewGenres: React.FC<AddNewGenresProps> = ({
  children,
  open,
  genre,
  onOpenChange,
}) => {
  const [newGenre, setNewGenre] = useState<AdminGenreSerialized | null>(
    genre ?? null,
  );
  const [activeStep, setActiveStep] = useState(0);

  // ✨ Step 1: Meta Data Form Hook
  const step1 = useGenreMetaDataStep({
    genre,
    newGenre,
    onSuccess: (savedGenre) => {
      console.log("Step 1 success:", savedGenre);
      setNewGenre(savedGenre);
      setActiveStep(1);
    },
  });

  // Reset form when genre changes (edit mode)
  useEffect(() => {
    if (genre) {
      step1.reset({
        name: genre.name,
        slug: genre.slug,
        parentId: genre.parentId,
        description: genre?.description ?? "",
      });
    }
  }, [genre, step1.reset]);
  const handleStep2Submit = async () => {
    if (!newGenre) return;
    // TODO: Implement file upload logic
    setActiveStep(2);
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      // Step 1: Submit meta data form
      step1.handleSubmit(step1.onSubmit)();
    } else if (activeStep === 1) {
      // Step 2: Upload files
      handleStep2Submit();
    } else if (activeStep === 2) {
      // Step 3: Close modal
      step1.reset();
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
          <ModalTitle>{genre ? "Update Genre" : "Add New Genre"}</ModalTitle>
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
              isLoading={step1.isPending || step1.isPendingUpdate}
              error={!step1.isValid && step1.isDirty}
            >
              <StepperContent>
                <GenreMetaDataStep
                  register={step1.register}
                  control={step1.control}
                  errors={step1.errors}
                  touchedFields={step1.touchedFields}
                  dirtyFields={step1.dirtyFields}
                  isSubmitting={step1.isSubmitting}
                  isPending={step1.isPending}
                  isPendingUpdate={step1.isPendingUpdate}
                  newGenre={newGenre}
                  onNameBlur={step1.handleNameBlur}
                />
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
          {activeStep > 0 && (
            <Button
              color="secondary"
              variant="glass"
              disabled={
                activeStep === 0 ||
                step1.isPending ||
                step1.isPendingUpdate
              }
              onClick={handleBack}
            >
              Previous
            </Button>
          )}
          {activeStep < 2 ? (
            <Button
              type="button"
              variant="glass"
              withPulse={
                !step1.isPending &&
                !step1.isPendingUpdate &&
                (activeStep === 0 ? step1.isValid : false)
              }
              onClick={handleNext}
              disabled={step1.isPending || step1.isPendingUpdate}
            >
              {activeStep === 0
                ? newGenre
                  ? "Update & Next"
                  : "Save & Next"
                : "Complete Upload"}
            </Button>
          ) : (
            <Button
              type="button"
              variant="glass"
              color="success"
              onClick={handleNext}
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
