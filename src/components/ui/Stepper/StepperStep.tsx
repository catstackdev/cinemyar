import { forwardRef } from 'react';
import { cn } from '@/utils/helpers/classNames';
import { useStepperContext } from './StepperContext';
import type { StepperStepProps } from './Stepper.types';
import {
  LABEL_SIZES,
  DESCRIPTION_SIZES,
  STEP_SPACING,
} from './constants';

const StepperStep = forwardRef<HTMLDivElement, StepperStepProps>(
  (
    {
      label,
      description,
      icon,
      status: _status,
      isLoading,
      disabled,
      error,
      children,
      className,
      onClick,
    },
    ref,
  ) => {
    const { size, isMobile } = useStepperContext();

    // Note: Actual rendering is handled by the parent Stepper component
    // This component is just a declarative placeholder for step data
    // The children (StepperContent) will be extracted and rendered separately

    // On mobile, we don't render step labels in the horizontal layout
    // They're only shown in the mobile navigation view
    if (isMobile) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center text-center',
          STEP_SPACING[size],
          className,
        )}
      >
        <span
          className={cn(
            'transition-colors duration-200',
            LABEL_SIZES[size],
            disabled && 'opacity-50',
          )}
        >
          {label}
        </span>
        {description && (
          <span
            className={cn(
              'text-muted-foreground transition-colors duration-200',
              DESCRIPTION_SIZES[size],
              disabled && 'opacity-50',
            )}
          >
            {description}
          </span>
        )}
      </div>
    );
  },
);

StepperStep.displayName = 'StepperStep';

export default StepperStep;
