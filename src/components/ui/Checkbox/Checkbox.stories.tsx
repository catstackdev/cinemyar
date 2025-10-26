import type { Meta, StoryObj } from "@storybook/react-vite";
import Checkbox from "./Checkbox";

const meta = {
  title: "Components/UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the checkbox",
    },
    label: {
      control: "text",
      description: "Label text for the checkbox",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    disabled: {
      control: "boolean",
      description: "Disable the checkbox",
    },
    indeterminate: {
      control: "boolean",
      description: "Set indeterminate state",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    label: "I agree to the terms",
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Select all items",
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled and checked",
    disabled: true,
    defaultChecked: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Accept privacy policy",
    error: "You must accept the privacy policy to continue",
  },
};

export const SmallSize: Story = {
  args: {
    label: "Small checkbox",
    size: "sm",
  },
};

export const MediumSize: Story = {
  args: {
    label: "Medium checkbox (default)",
    size: "md",
  },
};

export const LargeSize: Story = {
  args: {
    label: "Large checkbox",
    size: "lg",
  },
};

export const MultipleCheckboxes: Story = {
  render: () => (
    <div className="space-y-3">
      <Checkbox label="Option 1" defaultChecked />
      <Checkbox label="Option 2" />
      <Checkbox label="Option 3" />
      <Checkbox label="Option 4 (Disabled)" disabled />
    </div>
  ),
};

export const CheckboxGroup: Story = {
  render: () => (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold mb-2">
        Select your interests
      </legend>
      <Checkbox label="Technology" />
      <Checkbox label="Design" />
      <Checkbox label="Marketing" />
      <Checkbox label="Sales" />
      <Checkbox label="Other" />
    </fieldset>
  ),
};

export const WithLongLabel: Story = {
  args: {
    label:
      "I agree to the Terms of Service and Privacy Policy. By checking this box, I acknowledge that I have read and understood all terms and conditions.",
  },
};
