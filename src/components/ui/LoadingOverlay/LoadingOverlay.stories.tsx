import type { Meta, StoryObj } from "@storybook/react-vite";
import LoadingOverlay from "./LoadingOverlay";

const meta: Meta<typeof LoadingOverlay> = {
  title: "Components/UI/LoadingOverlay",
  component: LoadingOverlay,
  tags: ["autodocs"],
  argTypes: {
    isLoading: { control: "boolean" },
    className: { control: "text" },
    loadingProps: { control: "object" },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingOverlay>;

// Default loading overlay
export const Default: Story = {
  args: {
    isLoading: true,
    children: "Content goes here...",
    loadingProps: {
      type: "spinner",
      size: "md",
      text: "Loading...",
      color: "primary",
    },
  },
};

// Overlay off
export const NotLoading: Story = {
  args: {
    isLoading: false,
    children: "Content is loaded!",
  },
};

// Custom loader
export const CustomLoader: Story = {
  args: {
    isLoading: true,
    children: "Waiting for data...",
    loadingProps: {
      type: "dots",
      size: "lg",
      color: "success",
      text: "Fetching...",
    },
  },
};

