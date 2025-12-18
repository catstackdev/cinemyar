import type { Meta, StoryObj } from "@storybook/react-vite";
import Select from "./Select";

// --- 1. Sample Data ---
const sampleOptions = [
  { label: "Option A (Default)", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C (Disabled)", value: "c", disabled: true },
  { label: "Option D (Longer Label)", value: "d" },
];

// --- 2. Meta Definition ---
const meta: Meta<typeof Select> = {
  title: "Components/Forms/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    options: {
      description:
        "Array of option objects: { label: string, value: string, disabled?: boolean }",
      control: "object",
    },
    label: {
      description: "Label text displayed above the select field.",
      control: "text",
    },
    error: {
      description:
        "Error message displayed below the select field. Applies danger styling if present.",
      control: "text",
    },
    placeholder: {
      description: "Text for the disabled, default option.",
      control: "text",
    },
    disabled: {
      description: "If true, the select field is disabled.",
      control: "boolean",
    },
    // We add an onChange action for demonstration
    onChange: {
      action: "changed",
      description: "Event handler for selection changes.",
    },
  },
  args: {
    options: sampleOptions,
    label: "Select Genre Category",
    placeholder: "Choose an option...",
    id: "story-select", // Fixed ID for easier testing
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// --- 3. Stories ---

/**
 * The standard appearance of the Select component.
 */
export const Default: Story = {
  args: {
    // Default args are inherited from meta.args
  },
};

/**
 * Shows the Select component with a pre-selected value.
 */
export const PreSelectedValue: Story = {
  args: {
    label: "Pre-Selected Option",
    defaultValue: "b", // Set 'value' or 'defaultValue' to pre-select
  },
};

/**
 * Shows the component when it is in an error state, triggering the red border and error text.
 */
export const ErrorState: Story = {
  args: {
    error: "This field is required for submission.",
    label: "Select Category (Error)",
  },
};

/**
 * Shows the component when it is disabled and cannot be interacted with.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Select Category (Disabled)",
  },
};

/**
 * A compact example with only essential props, demonstrating minimal usage.
 */
export const Minimal: Story = {
  args: {
    label: undefined, // No label
    placeholder: "Select a value",
    options: [
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
    ],
  },
};

/**
 * An example demonstrating an option that is itself disabled.
 */
export const OptionDisabled: Story = {
  args: {
    label: "Select Option (One is Disabled)",
    options: [
      { label: "Active Choice", value: "active" },
      { label: "Unavailable Choice", value: "unavailable", disabled: true },
    ],
  },
};
