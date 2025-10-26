import type { Meta, StoryObj } from "@storybook/react-vite";
import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    src: { control: "text" },
    alt: { control: "text" },
    fallback: { control: "text" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Default Avatar with image
export const Default: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=3",
    alt: "Default Avatar",
    size: "md",
  },
};

// Avatar with fallback
export const Fallback: Story = {
  args: {
    src: "",
    alt: "Fallback Avatar",
    fallback: "AB",
    size: "md",
  },
};

// Small Avatar
export const Small: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=5",
    alt: "Small Avatar",
    size: "sm",
  },
};

// Large Avatar
export const Large: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=7",
    alt: "Large Avatar",
    size: "lg",
  },
};

// Extra Large Avatar
export const ExtraLarge: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=10",
    alt: "XL Avatar",
    size: "xl",
  },
};
