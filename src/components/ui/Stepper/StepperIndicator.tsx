import { forwardRef } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/helpers/classNames';
import { useStepperContext } from './StepperContext';
import type { StepStatus } from './Stepper.types';
import {
  STEP_INDICATOR_SIZES,
  STEP_VARIANT_CLASSES,
  STEP_STATUS_CLASSES,
} from './constants';
import Loading from '../Loading';

interface StepperIndicatorProps {
  stepNumber: number;
  status: StepStatus;
  icon?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

const StepperIndicator = forwardRef<HTMLDivElement, StepperIndicatorProps>(
  ({ stepNumber, status, icon, isLoading, className }, ref) => {
    const { variant, size, color, showStepNumbers } = useStepperContext();

    const renderContent = () => {
      if (isLoading) {
        return <Loading type="spinner" size="sm" inline inheritColor />;
      }

      if (status === 'complete') {
        return <Check className="w-5 h-5" />;
      }

      if (status === 'error') {
        return <AlertCircle className="w-5 h-5" />;
      }

      if (icon) {
        return icon;
      }

      if (showStepNumbers) {
        return stepNumber;
      }

      return null;
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center font-semibold',
          'transition-all duration-300 ease-in-out',
          'transform',
          status === 'current' && 'scale-110',
          STEP_INDICATOR_SIZES[size],
          STEP_VARIANT_CLASSES[variant],
          STEP_STATUS_CLASSES[status][color],
          className,
        )}
        aria-label={`Step ${stepNumber}`}
      >
        {renderContent()}
      </div>
    );
  },
);

StepperIndicator.displayName = 'StepperIndicator';

export default StepperIndicator;
