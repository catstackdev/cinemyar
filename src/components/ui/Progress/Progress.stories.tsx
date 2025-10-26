import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, useEffect } from "react";
import Progress from "./Progress";

const meta = {
  title: "Components/UI/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Variants: Story = {
  args: {
    value: 50,
  },
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Progress value={50} variant="default" />
      <Progress value={75} variant="success" />
      <Progress value={60} variant="warning" />
      <Progress value={30} variant="error" />
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    value: 50,
  },
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Progress value={50} size="sm" />
      <Progress value={50} size="md" />
      <Progress value={50} size="lg" />
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    value: 50,
  },
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Progress value={25} showLabel />
      <Progress value={50} showLabel variant="success" />
      <Progress value={75} showLabel variant="warning" />
      <Progress value={100} showLabel variant="error" />
    </div>
  ),
};

export const Animated: Story = {
  args: {
    value: 50,
  },
  render: () => {
    const AnimatedProgress = () => {
      const [progress, setProgress] = useState(0);

      useEffect(() => {
        const timer = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) return 0;
            return prev + 10;
          });
        }, 500);

        return () => clearInterval(timer);
      }, []);

      return <Progress value={progress} showLabel />;
    };

    return (
      <div className="w-96">
        <AnimatedProgress />
      </div>
    );
  },
};
