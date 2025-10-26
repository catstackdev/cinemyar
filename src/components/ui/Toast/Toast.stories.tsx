import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Toast, { ToastContainer } from "./";

const meta = {
  title: "Components/UI/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "warning", "error", "success"],
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const InfoIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

export const Default: Story = {
  args: {
    title: "Notification",
    message: "This is a toast notification",
  },
};

export const Variants: Story = {
  args: {
    title: "Notification",
    message: "This is a toast notification",
  },
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Toast variant="info" title="Info" message="Informational message" icon={<InfoIcon />} />
      <Toast variant="warning" title="Warning" message="Warning message" icon={<InfoIcon />} />
      <Toast variant="error" title="Error" message="Error message" icon={<InfoIcon />} />
      <Toast variant="success" title="Success" message="Success message" icon={<InfoIcon />} />
    </div>
  ),
};

export const WithAutoDismiss: Story = {
  args: {
    title: "Notification",
    message: "This is a toast notification",
  },
  render: () => {
    const ToastDemo = () => {
      const [visible, setVisible] = useState(true);

      return (
        <div className="w-96">
          {visible ? (
            <Toast
              variant="success"
              title="Auto-dismiss"
              message="This will disappear in 3 seconds"
              duration={3000}
              onClose={() => setVisible(false)}
              icon={<InfoIcon />}
            />
          ) : (
            <button
              onClick={() => setVisible(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Show Toast Again
            </button>
          )}
        </div>
      );
    };

    return <ToastDemo />;
  },
};

export const InContainer: Story = {
  args: {
    title: "Notification",
    message: "This is a toast notification",
  },
  render: () => (
    <div className="relative h-96 w-96 border-2 border-dashed border-gray-300">
      <ToastContainer position="top-right">
        <Toast variant="info" title="Info" message="Positioned in container" icon={<InfoIcon />} />
      </ToastContainer>
    </div>
  ),
};
