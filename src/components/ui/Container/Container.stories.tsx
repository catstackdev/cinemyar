import type { Meta, StoryObj } from "@storybook/react-vite";
import Container from "./Container";

const meta = {
  title: "Components/UI/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "full"],
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="bg-blue-100 p-8 rounded">
        <h2 className="text-2xl font-bold mb-4">Container Content</h2>
        <p>This content is inside a container with responsive padding and max-width.</p>
      </div>
    ),
  },
};

export const Sizes: Story = {
  args: {
    children: <div className="bg-blue-100 p-8 rounded">Container content</div>,
  },
  render: () => (
    <div className="space-y-4 p-4 bg-gray-50">
      <Container size="sm">
        <div className="bg-blue-100 p-4 rounded">Small (max-w-screen-sm)</div>
      </Container>
      <Container size="md">
        <div className="bg-green-100 p-4 rounded">Medium (max-w-screen-md)</div>
      </Container>
      <Container size="lg">
        <div className="bg-yellow-100 p-4 rounded">Large (max-w-screen-lg)</div>
      </Container>
      <Container size="xl">
        <div className="bg-purple-100 p-4 rounded">Extra Large (max-w-screen-xl)</div>
      </Container>
      <Container size="2xl">
        <div className="bg-pink-100 p-4 rounded">2XL (max-w-screen-2xl)</div>
      </Container>
      <Container size="full">
        <div className="bg-red-100 p-4 rounded">Full Width</div>
      </Container>
    </div>
  ),
};

export const NotCentered: Story = {
  args: {
    children: <div className="bg-blue-100 p-8 rounded">Container content</div>,
  },
  render: () => (
    <div className="p-4 bg-gray-50">
      <Container centered={false}>
        <div className="bg-blue-100 p-4 rounded">
          This container is not centered (no mx-auto)
        </div>
      </Container>
    </div>
  ),
};

export const AsSection: Story = {
  args: {
    children: <div className="bg-blue-100 p-8 rounded">Container content</div>,
  },
  render: () => (
    <Container as="section">
      <div className="bg-blue-100 p-8 rounded">
        <h2 className="text-2xl font-bold mb-4">This is a section element</h2>
        <p>Using the polymorphic "as" prop to render as a semantic HTML element.</p>
      </div>
    </Container>
  ),
};
