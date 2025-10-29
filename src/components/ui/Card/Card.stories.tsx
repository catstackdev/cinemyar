import type { Meta, StoryObj } from "@storybook/react-vite";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter,
  CardTitle,
  CardDescription 
} from "./";

const meta: Meta<typeof Card> = {
  title: "Components/UI/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardContent>
        <p>This is a default card with content padding.</p>
      </CardContent>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This card has a header with a title component.</p>
      </CardContent>
    </Card>
  ),
};

export const WithHeaderAndDescription: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription className="mt-1.5">
          This is a description that provides context about the card content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Main content area with proper padding and spacing.</p>
      </CardContent>
    </Card>
  ),
};

export const WithDividers: Story = {
  render: () => (
    <Card>
      <CardHeader divided>
        <CardTitle>Card with Dividers</CardTitle>
        <CardDescription className="mt-1.5">
          Notice the divider lines between sections
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content area separated by divider lines above and below.</p>
      </CardContent>
      <CardFooter divided className="flex justify-end gap-2">
        <button className="px-4 py-2 text-sm border border-border rounded-md">
          Cancel
        </button>
        <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md">
          Confirm
        </button>
      </CardFooter>
    </Card>
  ),
};

export const ProfileCard: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <div className="flex-1">
            <CardTitle>John Doe</CardTitle>
            <CardDescription className="mt-1">Software Engineer</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardFooter divided className="justify-around">
        <div className="text-center">
          <div className="text-xl font-bold">128</div>
          <div className="text-xs text-muted-foreground">Posts</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold">1.2k</div>
          <div className="text-xs text-muted-foreground">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold">342</div>
          <div className="text-xs text-muted-foreground">Following</div>
        </div>
      </CardFooter>
    </Card>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card className="max-w-sm transition-shadow hover:shadow-xl">
      <CardContent className="pt-6">
        <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center">
          <span className="text-muted-foreground">Image</span>
        </div>
        <CardTitle className="mb-2">Product Name</CardTitle>
        <CardDescription>
          Brief product description goes here with details about the item.
        </CardDescription>
      </CardContent>
      <CardFooter divided className="flex justify-between items-center">
        <span className="text-lg font-bold">$99.99</span>
        <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md">
          Add to Cart
        </button>
      </CardFooter>
    </Card>
  ),
};
