import { forwardRef } from 'react';
import { cn } from '@/utils/helpers/classNames';
import { useStepperContext } from './StepperContext';
import { CONNECTOR_SIZES, CONNECTOR_STATUS_CLASSES } from './constants';

interface StepperConnectorProps {
  isComplete: boolean;
  className?: string;
}

const StepperConnector = forwardRef<HTMLDivElement, StepperConnectorProps>(
  ({ isComplete, className }, ref) => {
    const { size, color } = useStepperContext();

    return (
      <div
        ref={ref}
        className={cn(
          'relative transition-all duration-500 ease-in-out',
          CONNECTOR_SIZES[size],
          isComplete
            ? CONNECTOR_STATUS_CLASSES.complete[color]
            : CONNECTOR_STATUS_CLASSES.incomplete[color],
          className,
        )}
        role="separator"
        aria-hidden="true"
      >
        {/* Animated fill for transition */}
        <div
          className={cn(
            'absolute inset-0 transition-transform duration-500 ease-in-out origin-left',
            CONNECTOR_STATUS_CLASSES.complete[color],
            isComplete ? 'scale-x-100' : 'scale-x-0',
          )}
        />
      </div>
    );
  },
);

StepperConnector.displayName = 'StepperConnector';

export default StepperConnector;
