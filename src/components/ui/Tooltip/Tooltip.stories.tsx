import type { Meta, StoryObj } from "@storybook/react-vite";
import Tooltip from "./Tooltip";
import Button from "../Button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/UI/Tooltip",
  component: Tooltip,
  argTypes: {
    position: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
    trigger: {
      control: { type: "select" },
      options: ["hover", "click", "focus", "manual"],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "dark", "light"],
    },
    delay: { control: { type: "number", min: 0, max: 2000, step: 100 } },
    offset: { control: { type: "number", min: 0, max: 50, step: 2 } },
    showArrow: { control: "boolean" },
    disabled: { control: "boolean" },
    maxWidth: { control: { type: "number", min: 100, max: 600, step: 50 } },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    position: "top",
    trigger: "hover",
    variant: "default",
    showArrow: true,
    children: <Button>Hover me</Button>,
  },
};

export const Positions: Story = {
  render: () => (
    <div className="flex gap-4 items-center justify-center p-20">
      <Tooltip content="Top position" position="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Bottom position" position="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Left position" position="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="Right position" position="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 items-center justify-center p-20">
      <Tooltip content="Default variant" variant="default">
        <Button>Default</Button>
      </Tooltip>
      <Tooltip content="Dark variant" variant="dark">
        <Button>Dark</Button>
      </Tooltip>
      <Tooltip content="Light variant" variant="light">
        <Button>Light</Button>
      </Tooltip>
    </div>
  ),
};

export const Triggers: Story = {
  render: () => (
    <div className="flex gap-4 items-center justify-center p-20">
      <Tooltip content="Hover trigger (default)" trigger="hover">
        <Button>Hover</Button>
      </Tooltip>
      <Tooltip content="Click trigger - click to open/close" trigger="click">
        <Button>Click</Button>
      </Tooltip>
      <Tooltip content="Focus trigger - tab to focus" trigger="focus">
        <Button>Focus</Button>
      </Tooltip>
    </div>
  ),
};

export const WithDelay: Story = {
  args: {
    content: "This tooltip appears after 500ms",
    delay: 500,
    children: <Button>Hover with delay</Button>,
  },
};

export const NoArrow: Story = {
  args: {
    content: "Tooltip without arrow",
    showArrow: false,
    children: <Button>No arrow</Button>,
  },
};

export const CustomOffset: Story = {
  args: {
    content: "Tooltip with custom offset",
    offset: 20,
    children: <Button>Custom offset</Button>,
  },
};

export const LongContent: Story = {
  args: {
    content:
      "This is a very long tooltip content that will wrap to multiple lines. The maxWidth prop controls how wide the tooltip can be.",
    maxWidth: 200,
    children: <Button>Long content</Button>,
  },
};

export const Disabled: Story = {
  args: {
    content: "You should not see this",
    disabled: true,
    children: <Button>Disabled tooltip</Button>,
  },
};

export const EdgeDetection: Story = {
  render: () => (
    <div className="h-screen w-screen p-4">
      <div className="absolute top-4 left-4">
        <Tooltip
          content="Auto-flips to bottom when too close to top"
          position="top"
        >
          <Button>Top-left corner</Button>
        </Tooltip>
      </div>
      <div className="absolute top-4 right-4">
        <Tooltip content="Auto-adjusts horizontal position" position="top">
          <Button>Top-right corner</Button>
        </Tooltip>
      </div>
      <div className="absolute bottom-4 left-4">
        <Tooltip
          content="Auto-flips to top when too close to bottom"
          position="bottom"
        >
          <Button>Bottom-left corner</Button>
        </Tooltip>
      </div>
      <div className="absolute bottom-4 right-4">
        <Tooltip content="Smart positioning everywhere" position="bottom">
          <Button>Bottom-right corner</Button>
        </Tooltip>
      </div>
    </div>
  ),
};
