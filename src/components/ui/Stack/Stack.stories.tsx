import type { Meta, StoryObj } from "@storybook/react-vite";
import Stack from "./Stack";

const meta = {
  title: "Components/UI/Stack",
  component: Stack,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
    },
    spacing: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl"],
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const StackItem = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-100 p-4 rounded border border-blue-300">
    {children}
  </div>
);

export const Default: Story = {
  args: {
    children: (
      <>
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
        <StackItem>Item 3</StackItem>
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    children: (
      <>
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
        <StackItem>Item 3</StackItem>
      </>
    ),
  },
  render: () => (
    <Stack direction="vertical" spacing="md">
      <StackItem>Item 1</StackItem>
      <StackItem>Item 2</StackItem>
      <StackItem>Item 3</StackItem>
    </Stack>
  ),
};

export const Horizontal: Story = {
  args: {
    children: (
      <>
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
        <StackItem>Item 3</StackItem>
      </>
    ),
  },
  render: () => (
    <Stack direction="horizontal" spacing="md">
      <StackItem>Item 1</StackItem>
      <StackItem>Item 2</StackItem>
      <StackItem>Item 3</StackItem>
    </Stack>
  ),
};

export const Spacing: Story = {
  args: {
    children: (
      <>
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
      </>
    ),
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-2">No Spacing</h3>
        <Stack spacing="none">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
        </Stack>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Small Spacing</h3>
        <Stack spacing="sm">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
        </Stack>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Large Spacing</h3>
        <Stack spacing="lg">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
        </Stack>
      </div>
    </div>
  ),
};

export const Alignment: Story = {
  args: {
    children: (
      <>
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
      </>
    ),
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-2">Align Start</h3>
        <Stack direction="horizontal" align="start" className="h-32 bg-gray-50">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
        </Stack>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Align Center</h3>
        <Stack direction="horizontal" align="center" className="h-32 bg-gray-50">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
        </Stack>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Align End</h3>
        <Stack direction="horizontal" align="end" className="h-32 bg-gray-50">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
        </Stack>
      </div>
    </div>
  ),
};

export const Justification: Story = {
  args: {
    children: (
      <>
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
      </>
    ),
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-2">Justify Between</h3>
        <Stack direction="horizontal" justify="between" className="bg-gray-50 p-4">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
        </Stack>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Justify Center</h3>
        <Stack direction="horizontal" justify="center" className="bg-gray-50 p-4">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
        </Stack>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Justify Evenly</h3>
        <Stack direction="horizontal" justify="evenly" className="bg-gray-50 p-4">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
    </div>
  ),
};

export const FormExample: Story = {
  args: {
    children: (
      <>
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
      </>
    ),
  },
  render: () => (
    <Stack spacing="lg" className="max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input className="w-full border rounded px-3 py-2" placeholder="Enter name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" className="w-full border rounded px-3 py-2" placeholder="Enter email" />
      </div>
      <Stack direction="horizontal" justify="end" spacing="sm">
        <button className="px-4 py-2 border rounded">Cancel</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      </Stack>
    </Stack>
  ),
};
