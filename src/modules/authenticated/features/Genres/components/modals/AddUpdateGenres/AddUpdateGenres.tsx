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
import { Button, Stepper, StepperContent, StepperStep } from "@/components/ui";
import {
  CheckCircle,
  FileText,
  ImageIcon,
  Image,
  FileImage,
} from "lucide-react";
import { GenreMetaDataStep, useGenreMetaDataStep } from "./steps/stepOne";
import { StepFive } from "./steps/StepFive";
import { useAdminGenre } from "../../../hooks/useAdminGenres";
import type { GenreDetailData, GenreMediaItem } from "@/shared/types/genre";
import { useGenreImageUpload } from "./hooks/useGenreImageUpload";
import { cn } from "@/utils/helpers";
import { GenreImageUpload } from "./components";
import { GenreImageType, MediaVersionStatus } from "@/shared/constants";

const AddNewGenres: React.FC<AddNewGenresProps> = ({
  children,
  open,
  genre,
  onOpenChange,
}) => {
  // genre?.id ,
  const [newGenre, setNewGenre] = useState<GenreDetailData | null>();
  // genreDetail?.data ?? null,

  const { data: genreDetail, isLoading: isDetailLoading } = useAdminGenre(
    genre?.id ?? newGenre?.id,
  );
  const [icons, setIcons] = useState<GenreMediaItem[]>(
    genreDetail?.data?.icons ?? [],
  );

  const [banners, setBanners] = useState<GenreMediaItem[]>(
    genreDetail?.data?.banners ?? [],
  );

  const [thumbnails, setThumbnails] = useState<GenreMediaItem[]>(
    genreDetail?.data?.thumbnails ?? [],
  );

  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    console.log("genreDetail", genreDetail);
  }, [activeStep]);

  // ✨ Step 1: Meta Data Form Hook
  const step1 = useGenreMetaDataStep({
    open,
    genre: genreDetail?.data,
    newGenre: newGenre ?? null,
    onSuccess: (savedGenre) => {
      console.log("Step 1 success:", savedGenre);
      setNewGenre(savedGenre as any);
      console.log("newGenre", newGenre);
      setActiveStep(1);
    },
  });

  // Upload status tracking
  const [iconStatus, setIconStatus] = useState<MediaVersionStatus | null>(null);
  const [bannerStatus, setBannerStatus] = useState<MediaVersionStatus | null>(
    null,
  );
  const [thumbnailStatus, setThumbnailStatus] =
    useState<MediaVersionStatus | null>(null);

  // Step 2: Icon Upload Hook
  const step2 = useGenreImageUpload({
    genreId: newGenre?.id ?? null,
    imageType: GenreImageType.ICON,
    onSuccess: (data) => {
      console.log("Step 2 icon success:", data);
      setIconStatus(data.status);
    },
  });

  // Step 3: Banner Upload Hook
  const step3 = useGenreImageUpload({
    genreId: newGenre?.id ?? null,
    imageType: GenreImageType.BANNER,
    onSuccess: (data) => {
      console.log("Step 3 banner success:", data);
      setBannerStatus(data.status);
    },
  });

  // Step 4: Thumbnail Upload Hook
  const step4 = useGenreImageUpload({
    genreId: newGenre?.id ?? null,
    imageType: GenreImageType.THUMBNAIL,
    onSuccess: (data) => {
      console.log("Step 4 thumbnail success:", data);
      setThumbnailStatus(data.status);
    },
  });

  useEffect(() => {
    setIcons(genreDetail?.data?.icons ?? []);
    console.log("Icons:", icons);
  }, [genreDetail?.data?.icons]);

  useEffect(() => {
    setBanners(genreDetail?.data?.banners ?? []);
    console.log("banners:", banners);
  }, [genreDetail?.data?.banners]);

  useEffect(() => {
    setThumbnails(genreDetail?.data?.thumbnails ?? []);
    console.log("thumbnails:", thumbnails);
  }, [genreDetail?.data?.thumbnails]);

  // Reset form when genre changes (edit mode)
  useEffect(() => {
    const genreData = genreDetail?.data;
    if (genreData) {
      setNewGenre(genreData);
      step1.reset({
        name: genreData.name,
        slug: genreData.slug,
        parentId: genreData.parentId,
        description: genreData?.description ?? "",
      });

      // Set existing media statuses from genre data
      if (genreData.icons && genreData.icons.length > 0) {
        setIconStatus(genreData?.icons?.[0]?.status ?? null);
      }
      if (genreData.banners && genreData.banners.length > 0) {
        setBannerStatus(genreData?.banners?.[0]?.status ?? null);
      }
      if (genreData.thumbnails && genreData.thumbnails.length > 0) {
        setThumbnailStatus(genreData?.thumbnails?.[0]?.status ?? null);
      }
    }
  }, [genreDetail?.data, step1.reset]);

  const handleNext = async () => {
    if (activeStep === 0) {
      // Step 1: Submit meta data form
      step1.handleSubmit(step1.onSubmit)();
    } else if (activeStep === 1) {
      // Step 2: Icon Upload - upload if file selected, otherwise skip
      // if (step2.canUpload) {
      //   step2.handleUpload();
      // }
      setActiveStep(2);
    } else if (activeStep === 2) {
      // Step 3: Banner Upload
      // if (step3.canUpload) {
      //   step3.handleUpload();
      // }
      setActiveStep(3);
    } else if (activeStep === 3) {
      // Step 4: Thumbnail Upload
      // if (step4.canUpload) {
      //   step4.handleUpload();
      // }
      setActiveStep(4);
    } else if (activeStep === 4) {
      // Step 5: Success - Close modal
      handleClose();
    }
  };

  const handleClose = () => {
    step1.reset();
    step2.reset();
    step3.reset();
    step4.reset();
    setIconStatus(null);
    setBannerStatus(null);
    setThumbnailStatus(null);
    setActiveStep(0);
    setNewGenre(null);
    onOpenChange?.(false);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((v) => v - 1);
    }
  };

  return (
    <ModalRoot open={open} onOpenChange={onOpenChange}>
      <ModalContent className="border border-primary/50" size="3xl">
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
                  isLoading={isDetailLoading && !newGenre}
                />
              </StepperContent>
            </StepperStep>

            <StepperStep
              label="Upload Icon"
              description="Icon (Optional)"
              icon={<ImageIcon className="w-5 h-5" />}
              isLoading={step2.isPending}
            >
              <StepperContent>
                <GenreImageUpload
                  activeVersion={newGenre?.activeIconVersion ?? null}
                  className={cn(
                    "p-4 bg-muted/50 rounded-lg overflow-auto max-h-[calc(100vh-330px)]",
                  )}
                  genreId={newGenre?.id ?? null}
                  items={icons}
                  imageType={GenreImageType.ICON}
                  title="Upload Genre Icon"
                  description="Upload an icon for this genre (optional). Recommended size: 256x256px"
                  icon={<ImageIcon className="w-12 h-12" />}
                  uploadStatus={iconStatus}
                  currentImages={newGenre?.iconUrls}
                  isPending={step2.isPending}
                  uploadProgress={step2.uploadProgress}
                  onFileDrop={step2.handleFileDrop}
                />
              </StepperContent>
            </StepperStep>

            <StepperStep
              label="Upload Banner"
              description="Banner (Optional)"
              icon={<Image className="w-5 h-5" />}
              isLoading={step3.isPending}
            >
              <StepperContent>
                <GenreImageUpload
                  activeVersion={newGenre?.activeBannerVersion ?? null}
                  className={cn(
                    "p-4 bg-muted/50 rounded-lg overflow-auto max-h-[calc(100vh-330px)]",
                  )}
                  genreId={newGenre?.id ?? null}
                  items={banners}
                  imageType={GenreImageType.BANNER}
                  title="Upload Genre Banner"
                  description="Upload an banner for this genre (optional). Recommended size: 1920x480px"
                  icon={<ImageIcon className="w-12 h-12" />}
                  uploadStatus={bannerStatus}
                  currentImages={newGenre?.bannerUrls}
                  isPending={step3.isPending}
                  uploadProgress={step3.uploadProgress}
                  onFileDrop={step3.handleFileDrop}
                />
              </StepperContent>
            </StepperStep>

            <StepperStep
              label="Upload Thumbnail"
              description="Thumbnail (Optional)"
              icon={<FileImage className="w-5 h-5" />}
              isLoading={step4.isPending}
            >
              <StepperContent>
                <GenreImageUpload
                  activeVersion={newGenre?.activeThumbnailVersion ?? null}
                  className={cn(
                    "p-4 bg-muted/50 rounded-lg overflow-auto max-h-[calc(100vh-330px)]",
                  )}
                  genreId={newGenre?.id ?? null}
                  items={thumbnails}
                  imageType={GenreImageType.THUMBNAIL}
                  title="Upload Genre Thumbnail"
                  description="Upload a thumbnail for this genre (optional). Recommended size: 1920x480px"
                  icon={<ImageIcon className="w-12 h-12" />}
                  uploadStatus={thumbnailStatus}
                  currentImages={newGenre?.thumbnailUrls}
                  isPending={step4.isPending}
                  uploadProgress={step4.uploadProgress}
                  onFileDrop={step4.handleFileDrop}
                />
              </StepperContent>
            </StepperStep>

            <StepperStep
              label="Complete"
              description="Review & Finish"
              icon={<CheckCircle className="w-5 h-5" />}
            >
              <StepperContent>
                <StepFive
                  genreName={newGenre?.name ?? "Genre"}
                  iconStatus={iconStatus}
                  bannerStatus={bannerStatus}
                  thumbnailStatus={thumbnailStatus}
                  newGenre={newGenre}
                />
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
                step1.isPendingUpdate ||
                step2.isPending ||
                step3.isPending ||
                step4.isPending
              }
              onClick={handleBack}
            >
              Previous
            </Button>
          )}
          {activeStep < 4 ? (
            <Button
              type="button"
              variant="glass"
              withPulse={
                !step1.isPending &&
                !step1.isPendingUpdate &&
                (activeStep === 0 ? step1.isValid : false)
              }
              onClick={handleNext}
              disabled={
                step1.isPending ||
                step1.isPendingUpdate ||
                step2.isPending ||
                step3.isPending ||
                step4.isPending ||
                isDetailLoading
              }
            >
              {activeStep === 0
                ? newGenre
                  ? "Update & Next"
                  : "Save & Next"
                : activeStep === 1
                  ? step2.canUpload
                    ? "Upload Icon & Next"
                    : "Skip Icon"
                  : activeStep === 2
                    ? step3.canUpload
                      ? "Upload Banner & Next"
                      : "Skip Banner"
                    : step4.canUpload
                      ? "Upload Thumbnail & Next"
                      : "Skip Thumbnail"}
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
