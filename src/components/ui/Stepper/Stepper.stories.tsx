import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Upload, Settings, CheckCircle, CreditCard, UserCheck, ShoppingCart } from 'lucide-react';
import { Stepper, StepperStep, StepperContent } from './index';

const meta: Meta<typeof Stepper> = {
  title: 'UI/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A horizontal stepper component for multi-step workflows. Supports custom icons, colors, sizes, and mobile-responsive navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeStep: {
      control: { type: 'number', min: 0, max: 5 },
      description: 'The currently active step (0-indexed)',
    },
    variant: {
      control: 'select',
      options: ['circle', 'square', 'simple'],
      description: 'Visual variant for step indicators',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the stepper',
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'info', 'warning', 'danger'],
      description: 'Color theme',
    },
    allowClickNavigation: {
      control: 'boolean',
      description: 'Allow clicking on completed steps to navigate',
    },
    showStepNumbers: {
      control: 'boolean',
      description: 'Show step numbers in indicators',
    },
    showMobileNavigation: {
      control: 'boolean',
      description: 'Show prev/next buttons on mobile',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

// Basic example
export const Default: Story = {
  args: {
    activeStep: 1,
    variant: 'circle',
    size: 'md',
    color: 'primary',
    showStepNumbers: true,
  },
  render: (args) => (
    <Stepper {...args}>
      <StepperStep label="Account Setup" description="Create your account" />
      <StepperStep label="Verification" description="Verify your email" />
      <StepperStep label="Complete" description="You're all set!" />
    </Stepper>
  ),
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
      <div className="space-y-6">
        <Stepper 
          activeStep={activeStep} 
          onStepClick={setActiveStep}
          allowClickNavigation
        >
          <StepperStep label="Personal Info" description="Tell us about yourself" />
          <StepperStep label="Address" description="Where do you live?" />
          <StepperStep label="Payment" description="Add payment method" />
          <StepperStep label="Review" description="Review and submit" />
        </Stepper>

        <div className="flex gap-2 justify-center mt-8">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="px-4 py-2 bg-secondary-200 dark:bg-secondary-700 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setActiveStep(Math.min(3, activeStep + 1))}
            disabled={activeStep === 3}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  },
};

// With custom icons
export const WithIcons: Story = {
  args: {
    activeStep: 1,
    showStepNumbers: false,
  },
  render: (args) => (
    <Stepper {...args}>
      <StepperStep label="Upload" description="Upload files" icon={<Upload className="w-5 h-5" />} />
      <StepperStep label="Configure" description="Set preferences" icon={<Settings className="w-5 h-5" />} />
      <StepperStep label="Complete" description="All done!" icon={<CheckCircle className="w-5 h-5" />} />
    </Stepper>
  ),
};

// With content panels
export const WithContent: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
      <Stepper activeStep={activeStep} onStepClick={setActiveStep} allowClickNavigation>
        <StepperStep label="Cart" description="Review items">
          <StepperContent>
            <div className="p-6 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Shopping Cart</h3>
              <p className="text-sm text-muted-foreground">Review your selected items and quantities.</p>
              <button
                onClick={() => setActiveStep(1)}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                Continue to Shipping
              </button>
            </div>
          </StepperContent>
        </StepperStep>

        <StepperStep label="Shipping" description="Delivery address">
          <StepperContent>
            <div className="p-6 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Shipping Information</h3>
              <p className="text-sm text-muted-foreground">Enter your delivery address and shipping preferences.</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setActiveStep(0)}
                  className="px-4 py-2 bg-secondary-200 dark:bg-secondary-700 rounded-md"
                >
                  Back
                </button>
                <button
                  onClick={() => setActiveStep(2)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          </StepperContent>
        </StepperStep>

        <StepperStep label="Payment" description="Payment details">
          <StepperContent>
            <div className="p-6 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Payment Method</h3>
              <p className="text-sm text-muted-foreground">Add your payment information securely.</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setActiveStep(1)}
                  className="px-4 py-2 bg-secondary-200 dark:bg-secondary-700 rounded-md"
                >
                  Back
                </button>
                <button
                  onClick={() => setActiveStep(3)}
                  className="px-4 py-2 bg-success text-success-foreground rounded-md"
                >
                  Place Order
                </button>
              </div>
            </div>
          </StepperContent>
        </StepperStep>

        <StepperStep label="Confirm" description="Order confirmation">
          <StepperContent>
            <div className="p-6 bg-success/10 border border-success/30 rounded-lg">
              <h3 className="font-semibold text-success mb-2">Order Placed!</h3>
              <p className="text-sm text-muted-foreground">Your order has been successfully placed. We'll send you a confirmation email shortly.</p>
            </div>
          </StepperContent>
        </StepperStep>
      </Stepper>
    );
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-sm font-medium mb-4">Small</h3>
        <Stepper activeStep={1} size="sm">
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
          <StepperStep label="Step 3" />
        </Stepper>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Medium (Default)</h3>
        <Stepper activeStep={1} size="md">
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
          <StepperStep label="Step 3" />
        </Stepper>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Large</h3>
        <Stepper activeStep={1} size="lg">
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
          <StepperStep label="Step 3" />
        </Stepper>
      </div>
    </div>
  ),
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-sm font-medium mb-4">Circle (Default)</h3>
        <Stepper activeStep={1} variant="circle">
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
          <StepperStep label="Step 3" />
        </Stepper>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Square</h3>
        <Stepper activeStep={1} variant="square">
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
          <StepperStep label="Step 3" />
        </Stepper>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Simple</h3>
        <Stepper activeStep={1} variant="simple">
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
          <StepperStep label="Step 3" />
        </Stepper>
      </div>
    </div>
  ),
};

// Different colors
export const Colors: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-sm font-medium mb-4">Primary (Default)</h3>
        <Stepper activeStep={1} color="primary">
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
          <StepperStep label="Step 3" />
        </Stepper>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Success</h3>
        <Stepper activeStep={1} color="success">
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
          <StepperStep label="Step 3" />
        </Stepper>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Info</h3>
        <Stepper activeStep={1} color="info">
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
          <StepperStep label="Step 3" />
        </Stepper>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Warning</h3>
        <Stepper activeStep={1} color="warning">
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
          <StepperStep label="Step 3" />
        </Stepper>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Danger</h3>
        <Stepper activeStep={1} color="danger">
          <StepperStep label="Step 1" />
          <StepperStep label="Step 2" />
          <StepperStep label="Step 3" />
        </Stepper>
      </div>
    </div>
  ),
};

// With error state
export const WithError: Story = {
  render: () => (
    <Stepper activeStep={2} color="primary">
      <StepperStep label="Personal Info" description="Completed" />
      <StepperStep label="Validation" description="Error occurred" error />
      <StepperStep label="Review" description="Pending" />
      <StepperStep label="Submit" description="Pending" />
    </Stepper>
  ),
};

// Loading state
export const LoadingState: Story = {
  render: () => (
    <Stepper activeStep={1}>
      <StepperStep label="Upload" description="Completed" />
      <StepperStep label="Processing" description="Please wait..." isLoading />
      <StepperStep label="Complete" description="Pending" />
    </Stepper>
  ),
};

// Complex workflow
export const ComplexWorkflow: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
      <Stepper 
        activeStep={activeStep} 
        onStepClick={setActiveStep}
        allowClickNavigation
        size="lg"
        color="primary"
      >
        <StepperStep 
          label="Account" 
          description="Create account"
          icon={<UserCheck className="w-5 h-5" />}
        >
          <StepperContent>
            <div className="p-6 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-4">Create Your Account</h3>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                />
                <button
                  onClick={() => setActiveStep(1)}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md"
                >
                  Continue
                </button>
              </div>
            </div>
          </StepperContent>
        </StepperStep>

        <StepperStep 
          label="Cart" 
          description="Review items"
          icon={<ShoppingCart className="w-5 h-5" />}
        >
          <StepperContent>
            <div className="p-6 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-4">Shopping Cart</h3>
              <p className="text-sm text-muted-foreground mb-4">Review your items</p>
              <button
                onClick={() => setActiveStep(2)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                Proceed to Payment
              </button>
            </div>
          </StepperContent>
        </StepperStep>

        <StepperStep 
          label="Payment" 
          description="Add payment"
          icon={<CreditCard className="w-5 h-5" />}
        >
          <StepperContent>
            <div className="p-6 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-4">Payment Details</h3>
              <p className="text-sm text-muted-foreground mb-4">Enter payment information</p>
              <button
                onClick={() => setActiveStep(3)}
                className="px-4 py-2 bg-success text-success-foreground rounded-md"
              >
                Complete Purchase
              </button>
            </div>
          </StepperContent>
        </StepperStep>

        <StepperStep 
          label="Complete" 
          description="Order placed"
          icon={<CheckCircle className="w-5 h-5" />}
        >
          <StepperContent>
            <div className="p-6 bg-success/10 border border-success/30 rounded-lg text-center">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="font-semibold text-success mb-2">Success!</h3>
              <p className="text-sm text-muted-foreground">Your order has been placed successfully.</p>
            </div>
          </StepperContent>
        </StepperStep>
      </Stepper>
    );
  },
};

// Disabled steps
export const DisabledSteps: Story = {
  render: () => (
    <Stepper activeStep={1} allowClickNavigation>
      <StepperStep label="Step 1" description="Completed" />
      <StepperStep label="Step 2" description="Current" />
      <StepperStep label="Step 3" description="Locked" disabled />
      <StepperStep label="Step 4" description="Locked" disabled />
    </Stepper>
  ),
};
