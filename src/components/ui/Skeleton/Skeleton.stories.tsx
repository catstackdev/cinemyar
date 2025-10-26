import type { Meta, StoryObj } from "@storybook/react-vite";
import Skeleton from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["text", "circular", "rectangular"],
    },

    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// Default Text Skeleton
export const Text: Story = {
  args: {
    variant: "text",
  },
};

// Circular Skeleton
export const Circular: Story = {
  args: {
    variant: "circular",
  },
};

// Rectangular Skeleton
export const Rectangular: Story = {
  args: {
    variant: "rectangular",
  },
};
