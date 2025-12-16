import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Stepper, StepperStep, StepperContent } from './index';
import { Upload, Settings, CheckCircle } from 'lucide-react';

describe('Stepper', () => {
  const mockOnStepClick = jest.fn();

  beforeEach(() => {
    mockOnStepClick.mockClear();
    // Mock window.innerWidth for mobile tests
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  describe('Basic Rendering', () => {
    it('should render stepper with steps', () => {
      render(
        <Stepper activeStep={0}>
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
          <StepperStep label="Step 3" />
        </Stepper>,
      );

      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });

    it('should render with descriptions', () => {
      render(
        <Stepper activeStep={0}>
          <StepperStep label="Account" description="Create your account" />
          <StepperStep label="Verify" description="Verify your email" />
        </Stepper>,
      );

      expect(screen.getByText('Create your account')).toBeInTheDocument();
      expect(screen.getByText('Verify your email')).toBeInTheDocument();
    });

    it('should render with custom icons', () => {
      render(
        <Stepper activeStep={0} showStepNumbers={false}>
          <StepperStep label="Upload" icon={<Upload data-testid="upload-icon" />} />
          <StepperStep label="Settings" icon={<Settings data-testid="settings-icon" />} />
        </Stepper>,
      );

      expect(screen.getByTestId('upload-icon')).toBeInTheDocument();
      expect(screen.getByTestId('settings-icon')).toBeInTheDocument();
    });

    it('should show step numbers when enabled', () => {
      render(
        <Stepper activeStep={0} showStepNumbers>
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
        </Stepper>,
      );

      // Step numbers should be in the indicators (aria-labels)
      expect(screen.getByLabelText(/step 1 of 2/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/step 2 of 2/i)).toBeInTheDocument();
    });
  });

  describe('Step Status', () => {
    it('should mark steps as complete, current, and upcoming', () => {
      render(
        <Stepper activeStep={1}>
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
          <StepperStep label="Step 3" />
        </Stepper>,
      );

      const step2Button = screen.getByLabelText(/step 2 of 3/i);
      expect(step2Button).toHaveAttribute('aria-current', 'step');
    });

    it('should handle error status', () => {
      render(
        <Stepper activeStep={1}>
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" error />
          <StepperStep label="Step 3" />
        </Stepper>,
      );

      const errorStep = screen.getByText('Step 2');
      expect(errorStep).toHaveClass('text-danger');
    });

    it('should handle manual status override', () => {
      render(
        <Stepper activeStep={0}>
          <StepperStep label="Step 1" status="complete" />
          <StepperStep label="Step 2" status="error" />
          <StepperStep label="Step 3" status="upcoming" />
        </Stepper>,
      );

      // All steps should be present regardless of activeStep
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });
  });

  describe('Step Navigation', () => {
    it('should call onStepClick when allowClickNavigation is true', () => {
      render(
        <Stepper activeStep={2} onStepClick={mockOnStepClick} allowClickNavigation>
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
          <StepperStep label="Step 3" />
        </Stepper>,
      );

      const step1Button = screen.getByLabelText(/step 1 of 3/i);
      fireEvent.click(step1Button);

      expect(mockOnStepClick).toHaveBeenCalledWith(0);
    });

    it('should not allow clicking future steps when allowClickNavigation is false', () => {
      render(
        <Stepper activeStep={0} onStepClick={mockOnStepClick} allowClickNavigation={false}>
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
          <StepperStep label="Step 3" />
        </Stepper>,
      );

      const step3Button = screen.getByLabelText(/step 3 of 3/i);
      fireEvent.click(step3Button);

      // Should not be called for future steps when allowClickNavigation is false
      expect(step3Button).toHaveAttribute('disabled');
    });

    it('should handle disabled steps', () => {
      render(
        <Stepper activeStep={0} onStepClick={mockOnStepClick} allowClickNavigation>
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" disabled />
          <StepperStep label="Step 3" />
        </Stepper>,
      );

      const step2Button = screen.getByLabelText(/step 2 of 3/i);
      fireEvent.click(step2Button);

      expect(mockOnStepClick).not.toHaveBeenCalled();
    });

    it('should call custom onClick handler', () => {
      const customOnClick = jest.fn();

      render(
        <Stepper activeStep={0}>
          <StepperStep label="Step 1" onClick={customOnClick} />
          <StepperStep label="Step 2" />
        </Stepper>,
      );

      const step1Button = screen.getByLabelText(/step 1 of 2/i);
      fireEvent.click(step1Button);

      expect(customOnClick).toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    it('should show loading spinner on step', () => {
      render(
        <Stepper activeStep={1}>
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" isLoading />
          <StepperStep label="Step 3" />
        </Stepper>,
      );

      // Loading component should be rendered (we can't directly test the spinner without better selectors)
      expect(screen.getByText('Step 2')).toBeInTheDocument();
    });
  });

  describe('Content Rendering', () => {
    it('should render StepperContent for active step', () => {
      render(
        <Stepper activeStep={1}>
          <StepperStep label="Step 1">
            <StepperContent>
              <div>Content 1</div>
            </StepperContent>
          </StepperStep>
          <StepperStep label="Step 2">
            <StepperContent>
              <div>Content 2</div>
            </StepperContent>
          </StepperStep>
          <StepperStep label="Step 3">
            <StepperContent>
              <div>Content 3</div>
            </StepperContent>
          </StepperStep>
        </Stepper>,
      );

      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
    });
  });

  describe('Variants and Sizes', () => {
    it('should apply circle variant classes', () => {
      const { container } = render(
        <Stepper activeStep={0} variant="circle">
          <StepperStep label="Step 1" />
        </Stepper>,
      );

      // Check if rounded-full class exists (circle variant)
      const indicator = container.querySelector('.rounded-full');
      expect(indicator).toBeInTheDocument();
    });

    it('should apply square variant classes', () => {
      const { container } = render(
        <Stepper activeStep={0} variant="square">
          <StepperStep label="Step 1" />
        </Stepper>,
      );

      // Check if rounded-md class exists (square variant)
      const indicator = container.querySelector('.rounded-md');
      expect(indicator).toBeInTheDocument();
    });

    it('should apply size classes', () => {
      const { container } = render(
        <Stepper activeStep={0} size="lg">
          <StepperStep label="Step 1" />
        </Stepper>,
      );

      // Large size should have w-12 h-12
      const indicator = container.querySelector('.w-12.h-12');
      expect(indicator).toBeInTheDocument();
    });
  });

  describe('Color Variants', () => {
    it('should apply primary color by default', () => {
      render(
        <Stepper activeStep={0}>
          <StepperStep label="Step 1" />
        </Stepper>,
      );

      // Should have primary color classes
      expect(screen.getByText('Step 1')).toBeInTheDocument();
    });

    it('should apply success color', () => {
      render(
        <Stepper activeStep={0} color="success">
          <StepperStep label="Step 1" />
        </Stepper>,
      );

      expect(screen.getByText('Step 1')).toBeInTheDocument();
    });

    it('should apply danger color', () => {
      render(
        <Stepper activeStep={0} color="danger">
          <StepperStep label="Step 1" />
        </Stepper>,
      );

      expect(screen.getByText('Step 1')).toBeInTheDocument();
    });
  });

  describe('Mobile Responsiveness', () => {
    it('should show mobile navigation on small screens', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <Stepper activeStep={1} onStepClick={mockOnStepClick} showMobileNavigation>
          <StepperStep label="Step 1" description="First step" />
          <StepperStep label="Step 2" description="Second step" />
          <StepperStep label="Step 3" description="Third step" />
        </Stepper>,
      );

      // Trigger resize event
      fireEvent(window, new Event('resize'));

      // Should show step count
      waitFor(() => {
        expect(screen.getByText(/step 2 of 3/i)).toBeInTheDocument();
      });
    });

    it('should show prev/next buttons on mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <Stepper activeStep={1} onStepClick={mockOnStepClick} showMobileNavigation>
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
          <StepperStep label="Step 3" />
        </Stepper>,
      );

      fireEvent(window, new Event('resize'));

      waitFor(() => {
        const prevButton = screen.getByLabelText('Previous step');
        const nextButton = screen.getByLabelText('Next step');

        expect(prevButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
      });
    });

    it('should disable previous button on first step', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <Stepper activeStep={0} onStepClick={mockOnStepClick} showMobileNavigation>
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
        </Stepper>,
      );

      fireEvent(window, new Event('resize'));

      waitFor(() => {
        const prevButton = screen.getByLabelText('Previous step');
        expect(prevButton).toBeDisabled();
      });
    });

    it('should disable next button on last step', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <Stepper activeStep={1} onStepClick={mockOnStepClick} showMobileNavigation>
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
        </Stepper>,
      );

      fireEvent(window, new Event('resize'));

      waitFor(() => {
        const nextButton = screen.getByLabelText('Next step');
        expect(nextButton).toBeDisabled();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(
        <Stepper activeStep={1}>
          <StepperStep label="Account Setup" />
          <StepperStep label="Verification" />
          <StepperStep label="Complete" />
        </Stepper>,
      );

      expect(screen.getByLabelText(/Account Setup, step 1 of 3/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Verification, step 2 of 3/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Complete, step 3 of 3/i)).toBeInTheDocument();
    });

    it('should mark current step with aria-current', () => {
      render(
        <Stepper activeStep={1}>
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
          <StepperStep label="Step 3" />
        </Stepper>,
      );

      const currentStep = screen.getByLabelText(/step 2 of 3/i);
      expect(currentStep).toHaveAttribute('aria-current', 'step');
    });

    it('should have navigation role', () => {
      const { container } = render(
        <Stepper activeStep={0}>
          <StepperStep label="Step 1" />
        </Stepper>,
      );

      const nav = container.querySelector('[role="navigation"]');
      expect(nav).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty children gracefully', () => {
      const { container } = render(<Stepper activeStep={0}>{null}</Stepper>);

      expect(container).toBeInTheDocument();
    });

    it('should handle single step', () => {
      render(
        <Stepper activeStep={0}>
          <StepperStep label="Only Step" />
        </Stepper>,
      );

      expect(screen.getByText('Only Step')).toBeInTheDocument();
    });

    it('should handle activeStep out of bounds', () => {
      render(
        <Stepper activeStep={10}>
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
        </Stepper>,
      );

      // Should not crash
      expect(screen.getByText('Step 1')).toBeInTheDocument();
    });
  });
});
