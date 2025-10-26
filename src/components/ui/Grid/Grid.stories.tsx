import type { Meta, StoryObj } from "@storybook/react-vite";
import Grid from "./Grid";

const meta = {
  title: "Components/UI/Grid",
  component: Grid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    cols: {
      control: "select",
      options: [1, 2, 3, 4, 5, 6, 12],
    },
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const GridItem = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-100 p-4 rounded text-center border border-blue-300">
    {children}
  </div>
);

export const Default: Story = {
  args: {
    cols: 3,
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
        <GridItem>Item 5</GridItem>
        <GridItem>Item 6</GridItem>
      </>
    ),
  },
};

export const Columns: Story = {
  args: {
    children: <GridItem>Item</GridItem>,
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-2">1 Column</h3>
        <Grid cols={1}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
        </Grid>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">2 Columns</h3>
        <Grid cols={2}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
        </Grid>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">4 Columns</h3>
        <Grid cols={4}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
        </Grid>
      </div>
    </div>
  ),
};

export const Gaps: Story = {
  args: {
    children: <GridItem>Item</GridItem>,
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-2">No Gap</h3>
        <Grid cols={3} gap="none">
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
        </Grid>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Small Gap</h3>
        <Grid cols={3} gap="sm">
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
        </Grid>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Large Gap</h3>
        <Grid cols={3} gap="lg">
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
        </Grid>
      </div>
    </div>
  ),
};

export const Responsive: Story = {
  args: {
    children: <GridItem>Item</GridItem>,
  },
  render: () => (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        Resize the viewport to see the responsive grid (1 col mobile → 4 cols desktop)
      </p>
      <Grid cols={4} responsive>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
        <GridItem>Item 5</GridItem>
        <GridItem>Item 6</GridItem>
        <GridItem>Item 7</GridItem>
        <GridItem>Item 8</GridItem>
      </Grid>
    </div>
  ),
};

export const CardGrid: Story = {
  args: {
    children: <GridItem>Item</GridItem>,
  },
  render: () => (
    <Grid cols={3} gap="lg" responsive>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Card {i}</h3>
          <p className="text-gray-600">Card content goes here</p>
        </div>
      ))}
    </Grid>
  ),
};
