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
          'transition-colors duration-300',
          CONNECTOR_SIZES[size],
          isComplete
            ? CONNECTOR_STATUS_CLASSES.complete[color]
            : CONNECTOR_STATUS_CLASSES.incomplete[color],
          className,
        )}
        role="separator"
        aria-hidden="true"
      />
    );
  },
);

StepperConnector.displayName = 'StepperConnector';

export default StepperConnector;
