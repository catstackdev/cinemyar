import { forwardRef } from 'react';
import { cn } from '@/utils/helpers/classNames';
import type { StepperContentProps } from './Stepper.types';

const StepperContent = forwardRef<HTMLDivElement, StepperContentProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mt-4 animate-in fade-in-50 slide-in-from-bottom-2 duration-300',
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

StepperContent.displayName = 'StepperContent';

export default StepperContent;
