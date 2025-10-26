import type { Meta, StoryObj } from "@storybook/react-vite";
import Label from "./Label";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "select" }, options: ["sm", "md", "lg"] },
    weight: {
      control: { type: "select" },
      options: ["normal", "medium", "semibold", "bold"],
    },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    htmlFor: { control: "text" },
    className: { control: "text" },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

// Default label
export const Default: Story = {
  args: {
    children: "Default Label",
    htmlFor: "input-id",
    size: "md",
    weight: "medium",
  },
};

// Small label
export const Small: Story = {
  args: {
    children: "Small Label",
    size: "sm",
    weight: "normal",
  },
};

// Large bold label
export const LargeBold: Story = {
  args: {
    children: "Large Bold Label",
    size: "lg",
    weight: "bold",
    required: true,
  },
};

// Disabled label
export const Disabled: Story = {
  args: {
    children: "Disabled Label",
    size: "md",
    weight: "medium",
    disabled: true,
  },
};
