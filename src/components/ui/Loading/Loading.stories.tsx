import type { Meta, StoryObj } from "@storybook/react-vite";
import Loading from "./Loading";

const meta: Meta<typeof Loading> = {
  title: "Components/UI/Loading",
  component: Loading,
  argTypes: {
    type: {
      control: { type: "select" },
      options: [
        "spinner",
        "dots",
        "pulse",
        "bars",
        "skeleton-text",
        "skeleton-circular",
        "skeleton-rect",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "danger", "success", "info", "warning"],
    },
    speed: { control: { type: "select" }, options: ["slow", "normal", "fast"] },
    skeletonVariant: {
      control: { type: "select" },
      options: ["default", "muted", "subtle"],
    },
    fullscreen: { control: "boolean" },
    inline: { control: "boolean" },
    inheritColor: { control: "boolean" },
    text: { control: "text" },
    count: { control: { type: "number", min: 1, max: 10, step: 1 } },
    zIndex: { control: { type: "number", min: 0, max: 100, step: 1 } },
    textWidths: { control: "object" },
    label: { control: "text" },
    children: { control: "text" },
    className: { control: "text" },
    containerClassName: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

// Default Spinner
export const Default: Story = {
  args: {
    type: "spinner",
    size: "md",
    color: "primary",
    text: "Loading...",
    fullscreen: false,
    inline: false,
    count: 1,
    speed: "fast",
    skeletonVariant: "subtle",
    label: "loading",
  },
};

// Dots
export const Dots: Story = {
  args: {
    type: "dots",
    size: "md",
    color: "secondary",
    text: "Loading dots...",
    speed: "fast",
  },
};

// Pulse
export const Pulse: Story = {
  args: {
    type: "pulse",
    size: "lg",
    color: "danger",
    text: "Please wait...",
    speed: "slow",
  },
};

// Bars
export const Bars: Story = {
  args: {
    type: "bars",
    size: "md",
    color: "info",
    text: "Processing...",
    speed: "normal",
  },
};

// Skeleton Text
export const SkeletonText: Story = {
  args: {
    type: "skeleton-text",
    size: "md",
    color: "secondary",
    count: 3,
    skeletonVariant: "muted",
    textWidths: ["10%", "20%", "100%"],
    label: "skeleton",
    text: "skeletonnnnn text",
    fullscreen: false,
    speed: "slow",
    zIndex: 100,
  },
};

// Skeleton Circular
export const SkeletonCircular: Story = {
  args: {
    type: "skeleton-circular",
    size: "lg",
    color: "success",
    count: 4,
    skeletonVariant: "subtle",
  },
};

// Skeleton Rect
export const SkeletonRect: Story = {
  args: {
    type: "skeleton-rect",
    size: "md",
    color: "warning",
    count: 2,
  },
};

// Fullscreen
export const Fullscreen: Story = {
  args: {
    type: "spinner",
    fullscreen: true,
    text: "Loading fullscreen...",
    zIndex: 100,
  },
};

// Inline Example
export const Inline: Story = {
  args: {
    type: "dots",
    inline: true,
    text: "Inline loading...",
  },
};
