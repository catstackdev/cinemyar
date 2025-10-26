import type { Meta, StoryObj } from "@storybook/react-vite";
import Spinner from "./Spinner";

const meta = {
  title: "Components/UI/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "white"],
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const Variants: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner variant="primary" />
      <Spinner variant="secondary" />
      <div className="bg-gray-800 p-4 rounded">
        <Spinner variant="white" />
      </div>
    </div>
  ),
};

export const InButton: Story = {
  args: {},
  render: () => (
    <div className="flex gap-4">
      <button className="px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2">
        <Spinner size="sm" variant="white" />
        Loading...
      </button>
      <button className="px-4 py-2 border border-gray-300 rounded flex items-center gap-2">
        <Spinner size="sm" />
        Processing
      </button>
    </div>
  ),
};
