import type { Meta, StoryObj } from "@storybook/react-vite";
import Alert from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "success", "warning", "danger"],
    },
    title: { control: "text" },
    children: { control: "text" },
    onClose: { action: "closed" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// Default info alert
export const Info: Story = {
  args: {
    variant: "info",
    title: "Info Alert",
    children: "This is an informational alert message.",
  },
};

// Success alert
export const Success: Story = {
  args: {
    variant: "success",
    title: "Success Alert",
    children: "Your operation was successful!",
  },
};

// Warning alert
export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning Alert",
    children: "Be careful with this action.",
  },
};

// Danger alert
export const Danger: Story = {
  args: {
    variant: "danger",
    title: "Danger Alert",
    children: "Something went wrong!",
  },
};

// Closable alert
export const Closable: Story = {
  args: {
    variant: "info",
    title: "Closable Alert",
    children: "You can close this alert using the onClose button.",
    onClose: () => console.log("Alert closed"),
  },
};
