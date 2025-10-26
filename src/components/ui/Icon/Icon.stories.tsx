import type { Meta, StoryObj } from "@storybook/react-vite";
import Icon from "./Icon";

const meta = {
  title: "Components/UI/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>
);

export const Default: Story = {
  render: () => <Icon as={HeartIcon} />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon as={HeartIcon} size="xs" />
      <Icon as={HeartIcon} size="sm" />
      <Icon as={HeartIcon} size="md" />
      <Icon as={HeartIcon} size="lg" />
      <Icon as={HeartIcon} size="xl" />
    </div>
  ),
};

export const WithColor: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon as={HeartIcon} size="lg" className="text-red-500" />
      <Icon as={HeartIcon} size="lg" className="text-blue-500" />
      <Icon as={HeartIcon} size="lg" className="text-green-500" />
      <Icon as={HeartIcon} size="lg" className="text-purple-500" />
    </div>
  ),
};
