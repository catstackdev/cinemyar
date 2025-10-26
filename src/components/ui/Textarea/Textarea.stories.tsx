import type { Meta, StoryObj } from "@storybook/react-vite";
import Textarea from "./Textarea";

const meta = {
  title: "Components/UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your text here...",
    rows: 4,
  },
};

export const WithLabel: Story = {
  args: {
    placeholder: "Enter your text here...",
    rows: 4,
  },
  render: (args) => (
    <div className="w-96">
      <label className="mb-2 block text-sm font-medium">Description</label>
      <Textarea {...args} />
    </div>
  ),
};

export const Resize: Story = {
  args: {
    placeholder: "Enter your text here...",
    rows: 4,
  },
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <p className="mb-2 text-sm font-medium">No Resize</p>
        <Textarea placeholder="Cannot be resized" rows={3} resize="none" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Vertical Resize</p>
        <Textarea placeholder="Resize vertically" rows={3} resize="vertical" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Horizontal Resize</p>
        <Textarea placeholder="Resize horizontally" rows={3} resize="horizontal" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Both Directions</p>
        <Textarea placeholder="Resize both ways" rows={3} resize="both" />
      </div>
    </div>
  ),
};

export const ErrorState: Story = {
  args: {
    placeholder: "Enter your text here...",
    rows: 4,
  },
  render: () => (
    <div className="w-96">
      <label className="mb-2 block text-sm font-medium">Comment</label>
      <Textarea placeholder="This field has an error" rows={4} error />
      <p className="mt-1 text-sm text-red-500">This field is required</p>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: "This textarea is disabled",
    rows: 4,
    disabled: true,
  },
};

export const WithCharacterCount: Story = {
  args: {
    placeholder: "Enter your text here...",
    rows: 4,
  },
  render: () => {
    const { useState } = require("react");
    const CharCountExample = () => {
      const [value, setValue] = useState("");
      const maxLength = 200;

      return (
        <div className="w-96">
          <label className="mb-2 block text-sm font-medium">Bio</label>
          <Textarea
            placeholder="Tell us about yourself"
            rows={4}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={maxLength}
          />
          <p className="mt-1 text-xs text-gray-500 text-right">
            {value.length}/{maxLength} characters
          </p>
        </div>
      );
    };

    return <CharCountExample />;
  },
};
