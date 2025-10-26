import type { Meta, StoryObj } from "@storybook/react-vite";
import Divider from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Components/UI/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    label: { control: "text" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

// Horizontal divider (default)
export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
};

// Vertical divider
export const Vertical: Story = {
  args: {
    orientation: "vertical",
    className: "h-12", // height needed for vertical divider
  },
};

// Horizontal with label
export const Labeled: Story = {
  args: {
    orientation: "horizontal",
    label: "Section",
  },
};

// Custom class
export const CustomClass: Story = {
  args: {
    orientation: "horizontal",
    label: "Custom",
    className: "border-dashed border-red-500",
  },
};
