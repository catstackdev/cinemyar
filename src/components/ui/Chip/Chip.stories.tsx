import type { Meta, StoryObj } from "@storybook/react-vite";
import Chip from "./Chip";

const meta = {
  title: "Components/UI/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "success", "warning", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Chip",
  },
};

export const Variants: Story = {
  args: {
    children: "Chip",
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip variant="default">Default</Chip>
      <Chip variant="primary">Primary</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="danger">Danger</Chip>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    children: "Chip",
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
    </div>
  ),
};

export const WithRemove: Story = {
  args: {
    children: "Chip",
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip variant="default" onRemove={() => alert("Removed!")}>
        Removable
      </Chip>
      <Chip variant="primary" onRemove={() => alert("Removed!")}>
        Primary
      </Chip>
      <Chip variant="success" onRemove={() => alert("Removed!")}>
        Success
      </Chip>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: "Chip",
  },
  render: () => {
    const UserIcon = () => (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    );

    return (
      <div className="flex flex-wrap gap-2">
        <Chip icon={<UserIcon />}>John Doe</Chip>
        <Chip icon={<UserIcon />} variant="primary">
          Jane Smith
        </Chip>
        <Chip icon={<UserIcon />} onRemove={() => alert("Removed!")}>
          Bob Wilson
        </Chip>
      </div>
    );
  },
};

export const TagCloud: Story = {
  args: {
    children: "Chip",
  },
  render: () => (
    <div className="flex flex-wrap gap-2 max-w-md">
      <Chip size="sm" variant="primary">React</Chip>
      <Chip size="sm" variant="primary">TypeScript</Chip>
      <Chip size="sm" variant="primary">Tailwind</Chip>
      <Chip size="sm" variant="success">Vite</Chip>
      <Chip size="sm" variant="success">Storybook</Chip>
      <Chip size="sm" variant="default">JavaScript</Chip>
      <Chip size="sm" variant="default">CSS</Chip>
      <Chip size="sm" variant="warning">HTML</Chip>
    </div>
  ),
};
