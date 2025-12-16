import {
  forwardRef,
  useMemo,
  useState,
  useEffect,
  Children,
  isValidElement,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/helpers/classNames";
import { StepperContext } from "./StepperContext";
import StepperIndicator from "./StepperIndicator";
import StepperConnector from "./StepperConnector";
import StepperContent from "./StepperContent";
import type {
  StepperProps,
  StepData,
  StepStatus,
  StepperContentProps,
} from "./Stepper.types";
import {
  CONECTOR_X_PADDING,
  CONECTOR_Y_POSITION,
  MOBILE_BREAKPOINT,
} from "./constants";

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      children,
      activeStep = 0,
      variant = "circle",
      size = "md",
      color = "primary",
      onStepClick,
      allowClickNavigation = false,
      showStepNumbers = true,
      showMobileNavigation = true,
      className,
    },
    ref,
  ) => {
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile viewport
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);

      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Extract step data from children
    const steps = useMemo(() => {
      const stepData: StepData[] = [];

      Children.forEach(children, (child, index) => {
        if (isValidElement(child)) {
          const props = child.props as any;

          // Determine step status
          let status: StepStatus = "upcoming";
          if (props.error || props.status === "error") {
            status = "error";
          } else if (props.status) {
            status = props.status;
          } else if (index < activeStep) {
            status = "complete";
          } else if (index === activeStep) {
            status = "current";
          }

          // Extract content from children (StepperContent)
          let content: React.ReactNode = null;
          if (props.children) {
            Children.forEach(props.children, (contentChild) => {
              if (
                isValidElement(contentChild) &&
                contentChild.type === StepperContent
              ) {
                content = (contentChild.props as StepperContentProps).children;
              }
            });
          }

          stepData.push({
            label: props.label || `Step ${index + 1}`,
            description: props.description,
            icon: props.icon,
            status,
            isLoading: props.isLoading,
            disabled: props.disabled,
            onClick: props.onClick,
            content,
          });
        }
      });

      return stepData;
    }, [children, activeStep]);

    const contextValue = useMemo(
      () => ({
        activeStep,
        totalSteps: steps.length,
        variant,
        size,
        color,
        onStepClick,
        allowClickNavigation,
        showStepNumbers,
        showMobileNavigation,
        isMobile,
      }),
      [
        activeStep,
        steps.length,
        variant,
        size,
        color,
        onStepClick,
        allowClickNavigation,
        showStepNumbers,
        showMobileNavigation,
        isMobile,
      ],
    );

    const handleStepClick = (index: number) => {
      if (steps[index]?.disabled) return;

      // Custom onClick always takes precedence
      if (steps[index]?.onClick) {
        steps[index].onClick?.();
        return;
      }

      // Regular navigation
      if (allowClickNavigation && index <= activeStep) {
        onStepClick?.(index);
      } else if (!allowClickNavigation && onStepClick) {
        onStepClick(index);
      }
    };

    const canGoPrevious = activeStep > 0;
    const canGoNext = activeStep < steps.length - 1;

    const handlePrevious = () => {
      if (canGoPrevious) {
        onStepClick?.(activeStep - 1);
      }
    };

    const handleNext = () => {
      if (canGoNext) {
        onStepClick?.(activeStep + 1);
      }
    };

    // Mobile view: Show only current step with navigation
    if (isMobile && showMobileNavigation) {
      const currentStepData = steps[activeStep];

      if (!currentStepData) return null;

      return (
        <StepperContext.Provider value={contextValue}>
          <div ref={ref} className={cn("w-full", className)}>
            {/* Mobile step indicator */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={!canGoPrevious}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  canGoPrevious
                    ? "hover:bg-primary/10 text-primary"
                    : "opacity-30 cursor-not-allowed",
                )}
                aria-label="Previous step"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center flex-1 mx-4">
                <div className="flex items-center gap-2 mb-2">
                  <StepperIndicator
                    stepNumber={activeStep + 1}
                    status={currentStepData.status}
                    icon={currentStepData.icon}
                    isLoading={currentStepData.isLoading}
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{currentStepData.label}</p>
                  {currentStepData.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {currentStepData.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Step {activeStep + 1} of {steps.length}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={!canGoNext}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  canGoNext
                    ? "hover:bg-primary/10 text-primary"
                    : "opacity-30 cursor-not-allowed",
                )}
                aria-label="Next step"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile content */}
            {currentStepData.content && (
              <div className="mt-4">
                <StepperContent>{currentStepData.content}</StepperContent>
              </div>
            )}
          </div>
        </StepperContext.Provider>
      );
    }

    // Desktop view: Horizontal stepper
    return (
      <StepperContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn("w-full", className)}
          role="navigation"
          aria-label="Progress"
        >
          {/* Steps header */}
          <div className="flex flex-col w-full">
            {/* Indicators with connectors - connector lines go between circles only */}
            <div className="flex items-center justify-between w-full">
              {steps.map((step, index) => {
                const isClickable =
                  !step.disabled &&
                  (step.onClick !== undefined || // Custom onClick always makes it clickable
                    (allowClickNavigation && index <= activeStep)); // Only allow clicking completed or current steps when allowClickNavigation is true

                return (
                  <div key={index} className="flex  flex-1 ">
                    <div className="flex gap-2 flex-col relative flex-1">
                      {index < steps.length - 1 && (
                        <div
                          className={cn(
                            " w-full absolute   transform translate-x-1/2",
                            CONECTOR_X_PADDING[size],
                            CONECTOR_Y_POSITION[size],
                          )}
                        >
                          <StepperConnector
                            isComplete={steps[index]?.status === "complete"}
                          />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handleStepClick(index)}
                        disabled={!isClickable}
                        className={cn(
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
                          "transition-transform duration-200 shrink-0",
                          "self-center",
                          isClickable && "cursor-pointer hover:scale-105",
                          !isClickable && "cursor-default",
                        )}
                        aria-label={`${step.label}, step ${index + 1} of ${steps.length}`}
                        aria-current={
                          step.status === "current" ? "step" : undefined
                        }
                      >
                        <StepperIndicator
                          stepNumber={index + 1}
                          status={step.status}
                          icon={step.icon}
                          isLoading={step.isLoading}
                        />
                      </button>
                      <div className="flex items-start flex-1 last:flex-none self-center">
                        {/* Label aligned with indicator */}
                        <div
                          className={cn("flex flex-col items-center shrink-0")}
                        >
                          <p
                            className="text-sm font-medium w-full text-center"
                            title={step.label}
                          >
                            <span
                              className={cn(
                                "block px-1 transition-colors",
                                step.status === "current" && "text-foreground",
                                step.status === "complete" && "text-foreground",
                                step.status === "upcoming" &&
                                  "text-muted-foreground",
                                step.status === "error" && "text-danger",
                              )}
                            >
                              {step.label}
                            </span>
                          </p>
                          {step.description && (
                            <p
                              className="text-xs mt-1 w-full text-center"
                              title={step.description}
                            >
                              <span className="block truncate px-1 text-muted-foreground">
                                {step.description}
                              </span>
                            </p>
                          )}
                        </div>

                        {/* Spacer to match connector width */}
                        {index < steps.length - 1 && (
                          <div className="flex-1 px-2" aria-hidden="true" />
                        )}
                      </div>
                    </div>

                    {/* Connector line (not for last step) */}
                    {/* {index < steps.length - 1 && ( */}
                    {/*   <div className="flex-1 px-2"> */}
                    {/*     <StepperConnector */}
                    {/*       isComplete={steps[index]?.status === "complete"} */}
                    {/*     /> */}
                    {/*   </div> */}
                    {/* )} */}
                  </div>
                );
              })}
            </div>

            {/* Labels & Descriptions below indicators - mirrors indicator structure */}
          </div>

          {/* Active step content */}
          {steps[activeStep]?.content && (
            <div className="mt-8">
              <StepperContent>{steps[activeStep].content}</StepperContent>
            </div>
          )}
        </div>
      </StepperContext.Provider>
    );
  },
);

Stepper.displayName = "Stepper";

export default Stepper;
