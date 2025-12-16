import type { ReactNode } from 'react';

// Step status types
export type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';

// Stepper variants
export type StepperVariant = 'circle' | 'square' | 'simple';

// Stepper sizes
export type StepperSize = 'sm' | 'md' | 'lg';

// Color variants (align with theme)
export type StepperColor = 'primary' | 'success' | 'info' | 'warning' | 'danger';

// Root Stepper component props
export interface StepperProps {
  children: ReactNode;
  activeStep?: number; // 0-indexed
  variant?: StepperVariant;
  size?: StepperSize;
  color?: StepperColor;
  onStepClick?: (stepIndex: number) => void;
  allowClickNavigation?: boolean;
  showStepNumbers?: boolean;
  className?: string;
  showMobileNavigation?: boolean; // Show prev/next buttons on mobile
}

// Individual step props
export interface StepperStepProps {
  label: string;
  description?: string;
  icon?: ReactNode;
  status?: StepStatus; // Override auto-calculated status
  isLoading?: boolean;
  disabled?: boolean;
  error?: boolean; // Shorthand for status="error"
  children?: ReactNode; // For StepperContent
  className?: string;
  onClick?: () => void;
}

// Step content props
export interface StepperContentProps {
  children: ReactNode;
  className?: string;
}

// Context value shared across components
export interface StepperContextValue {
  activeStep: number;
  totalSteps: number;
  variant: StepperVariant;
  size: StepperSize;
  color: StepperColor;
  onStepClick?: (index: number) => void;
  allowClickNavigation: boolean;
  showStepNumbers: boolean;
  showMobileNavigation: boolean;
  isMobile: boolean;
}

// Internal step data
export interface StepData {
  label: string;
  description?: string;
  icon?: ReactNode;
  status: StepStatus;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  content?: ReactNode;
}
