import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Radio from "./Radio";

const meta = {
  title: "Components/UI/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the radio button",
    },
    label: {
      control: "text",
      description: "Label text for the radio button",
    },
    description: {
      control: "text",
      description: "Description text below the label",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    disabled: {
      control: "boolean",
      description: "Disable the radio button",
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Option 1",
    name: "default-radio",
  },
};

export const WithoutLabel: Story = {
  args: {
    name: "no-label-radio",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Premium Plan",
    description: "Get access to all premium features and priority support",
    name: "plan",
  },
};

export const Checked: Story = {
  args: {
    label: "Selected option",
    name: "checked-radio",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled option",
    name: "disabled-radio",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled and checked",
    name: "disabled-checked-radio",
    disabled: true,
    defaultChecked: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Select an option",
    name: "error-radio",
    error: "Please select an option to continue",
  },
};

export const SmallSize: Story = {
  args: {
    label: "Small radio button",
    name: "small-radio",
    size: "sm",
  },
};

export const MediumSize: Story = {
  args: {
    label: "Medium radio button (default)",
    name: "medium-radio",
    size: "md",
  },
};

export const LargeSize: Story = {
  args: {
    label: "Large radio button",
    name: "large-radio",
    size: "lg",
  },
};

export const RadioGroup: Story = {
  render: () => (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold mb-2">Choose a plan</legend>
      <Radio name="plan-group" label="Free" description="Basic features only" />
      <Radio
        name="plan-group"
        label="Pro"
        description="All features plus priority support"
      />
      <Radio
        name="plan-group"
        label="Enterprise"
        description="Custom solutions for your business"
      />
    </fieldset>
  ),
};

export const RadioGroupControlled: Story = {
  render: function ControlledRadioGroup() {
    const [selected, setSelected] = useState("option1");

    return (
      <div className="space-y-4">
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold mb-2">
            Select an option
          </legend>
          <Radio
            name="controlled-group"
            label="Option 1"
            value="option1"
            checked={selected === "option1"}
            onChange={(e) => setSelected(e.target.value)}
          />
          <Radio
            name="controlled-group"
            label="Option 2"
            value="option2"
            checked={selected === "option2"}
            onChange={(e) => setSelected(e.target.value)}
          />
          <Radio
            name="controlled-group"
            label="Option 3"
            value="option3"
            checked={selected === "option3"}
            onChange={(e) => setSelected(e.target.value)}
          />
        </fieldset>
        <p className="text-sm text-gray-600">
          Selected: <strong>{selected}</strong>
        </p>
      </div>
    );
  },
};

export const PaymentMethods: Story = {
  render: () => (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold mb-2">Payment Method</legend>
      <Radio
        name="payment"
        label="Credit Card"
        description="Pay securely with your credit or debit card"
        defaultChecked
      />
      <Radio
        name="payment"
        label="PayPal"
        description="Fast and secure payment through PayPal"
      />
      <Radio
        name="payment"
        label="Bank Transfer"
        description="Direct bank transfer (processing takes 2-3 days)"
      />
      <Radio
        name="payment"
        label="Cash on Delivery"
        description="Pay when you receive your order"
        disabled
      />
    </fieldset>
  ),
};

export const ShippingOptions: Story = {
  render: () => (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold mb-2">Shipping Speed</legend>
      <Radio
        name="shipping"
        label="Standard Shipping - Free"
        description="Delivery in 5-7 business days"
        defaultChecked
      />
      <Radio
        name="shipping"
        label="Express Shipping - $9.99"
        description="Delivery in 2-3 business days"
      />
      <Radio
        name="shipping"
        label="Overnight Shipping - $24.99"
        description="Next business day delivery"
      />
    </fieldset>
  ),
};

export const WithLongLabels: Story = {
  render: () => (
    <fieldset className="space-y-3 max-w-md">
      <legend className="text-sm font-semibold mb-2">
        Terms and Conditions
      </legend>
      <Radio
        name="terms"
        label="I agree to the Terms of Service and Privacy Policy"
        description="By selecting this option, you acknowledge that you have read and understood all terms and conditions, including our data processing practices."
      />
      <Radio
        name="terms"
        label="I do not agree"
        description="You will not be able to proceed without accepting the terms."
        disabled
      />
    </fieldset>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-semibold">Small</p>
        <Radio name="sizes-sm" label="Small radio button" size="sm" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold">Medium (Default)</p>
        <Radio name="sizes-md" label="Medium radio button" size="md" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold">Large</p>
        <Radio name="sizes-lg" label="Large radio button" size="lg" />
      </div>
    </div>
  ),
};

export const InteractivePlayground: Story = {
  args: {
    label: "Interactive Radio",
    description: "Try toggling the controls",
    name: "playground",
    size: "md",
    disabled: false,
  },
};
