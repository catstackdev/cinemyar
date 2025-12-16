import type { StepperSize, StepperVariant, StepperColor } from './Stepper.types';

// Step indicator sizes (circle/square)
export const STEP_INDICATOR_SIZES: Record<StepperSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

// Connector line spacing and size
export const CONNECTOR_SIZES: Record<StepperSize, string> = {
  sm: 'h-0.5 min-w-[40px] flex-1',
  md: 'h-1 min-w-[60px] flex-1',
  lg: 'h-1 min-w-[80px] flex-1',
};

// Step indicator variant shapes
export const STEP_VARIANT_CLASSES: Record<StepperVariant, string> = {
  circle: 'rounded-full',
  square: 'rounded-md',
  simple: 'rounded-sm',
};

// Step status colors using CSS variables from globals.css
export const STEP_STATUS_CLASSES: Record<string, Record<StepperColor, string>> = {
  complete: {
    primary: 'bg-primary text-primary-foreground border-2 border-primary',
    success: 'bg-success text-success-foreground border-2 border-success',
    info: 'bg-info text-info-foreground border-2 border-info',
    warning: 'bg-warning text-warning-foreground border-2 border-warning',
    danger: 'bg-danger text-danger-foreground border-2 border-danger',
  },
  current: {
    primary: 'bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100 border-2 border-primary ring-4 ring-primary/20',
    success: 'bg-success-100 dark:bg-success-900 text-success-900 dark:text-success-100 border-2 border-success ring-4 ring-success/20',
    info: 'bg-info-100 dark:bg-info-900 text-info-900 dark:text-info-100 border-2 border-info ring-4 ring-info/20',
    warning: 'bg-warning-100 dark:bg-warning-900 text-warning-900 dark:text-warning-100 border-2 border-warning ring-4 ring-warning/20',
    danger: 'bg-danger-100 dark:bg-danger-900 text-danger-900 dark:text-danger-100 border-2 border-danger ring-4 ring-danger/20',
  },
  upcoming: {
    primary: 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 border-2 border-secondary-300 dark:border-secondary-700',
    success: 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 border-2 border-secondary-300 dark:border-secondary-700',
    info: 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 border-2 border-secondary-300 dark:border-secondary-700',
    warning: 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 border-2 border-secondary-300 dark:border-secondary-700',
    danger: 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 border-2 border-secondary-300 dark:border-secondary-700',
  },
  error: {
    primary: 'bg-danger text-danger-foreground border-2 border-danger ring-4 ring-danger/20',
    success: 'bg-danger text-danger-foreground border-2 border-danger ring-4 ring-danger/20',
    info: 'bg-danger text-danger-foreground border-2 border-danger ring-4 ring-danger/20',
    warning: 'bg-danger text-danger-foreground border-2 border-danger ring-4 ring-danger/20',
    danger: 'bg-danger text-danger-foreground border-2 border-danger ring-4 ring-danger/20',
  },
};

// Connector line status colors
export const CONNECTOR_STATUS_CLASSES: Record<string, Record<StepperColor, string>> = {
  complete: {
    primary: 'bg-primary',
    success: 'bg-success',
    info: 'bg-info',
    warning: 'bg-warning',
    danger: 'bg-danger',
  },
  incomplete: {
    primary: 'bg-secondary-300 dark:bg-secondary-700',
    success: 'bg-secondary-300 dark:bg-secondary-700',
    info: 'bg-secondary-300 dark:bg-secondary-700',
    warning: 'bg-secondary-300 dark:bg-secondary-700',
    danger: 'bg-secondary-300 dark:bg-secondary-700',
  },
};

// Label text sizes
export const LABEL_SIZES: Record<StepperSize, string> = {
  sm: 'text-xs font-medium',
  md: 'text-sm font-medium',
  lg: 'text-base font-semibold',
};

// Description text sizes
export const DESCRIPTION_SIZES: Record<StepperSize, string> = {
  sm: 'text-xs',
  md: 'text-xs',
  lg: 'text-sm',
};

// Step container spacing
export const STEP_SPACING: Record<StepperSize, string> = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-3',
};

// Mobile breakpoint (matches Tailwind's md: breakpoint)
export const MOBILE_BREAKPOINT = 768;
