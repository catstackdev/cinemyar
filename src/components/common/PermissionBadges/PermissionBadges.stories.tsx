import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PermissionBadges from "./PermissionBadges";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const meta: Meta<typeof PermissionBadges> = {
  title: "Components/Common/PermissionBadges",
  component: PermissionBadges,
  decorators: [
    (Story: React.ComponentType) => (
      <QueryClientProvider client={queryClient}>
        <div className="p-8 bg-background">
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    permissions: {
      control: "object",
      description: "Array of permission strings",
    },
    maxDisplay: {
      control: { type: "number", min: 1, max: 10 },
      description: "Maximum number of badges to display",
    },
    showTooltip: {
      control: "boolean",
      description: "Show detailed tooltip on hover",
    },
    size: {
      control: { type: "select", options: ["sm", "md", "lg"] },
      description: "Badge size variant",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PermissionBadges>;

export const Default: Story = {
  args: {
    permissions: ["movie.view", "movie.edit", "user.view"],
    maxDisplay: 3,
    showTooltip: true,
    size: "sm",
  },
};

export const NoPermissions: Story = {
  args: {
    permissions: [],
  },
};

export const WithWildcard: Story = {
  args: {
    permissions: ["movie.*", "user.view", "user.edit"],
    maxDisplay: 3,
    showTooltip: true,
    size: "sm",
  },
};

export const ManyPermissions: Story = {
  args: {
    permissions: [
      "movie.view",
      "movie.edit",
      "movie.create",
      "movie.delete",
      "user.view",
      "user.edit",
      "role.view",
      "role.edit",
    ],
    maxDisplay: 3,
    showTooltip: true,
    size: "sm",
  },
};

export const WithoutTooltip: Story = {
  args: {
    permissions: ["movie.view", "movie.edit", "user.view"],
    maxDisplay: 3,
    showTooltip: false,
    size: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    permissions: ["movie.*", "user.view"],
    maxDisplay: 3,
    showTooltip: true,
    size: "lg",
  },
};

export const SinglePermission: Story = {
  args: {
    permissions: ["movie.view"],
    maxDisplay: 3,
    showTooltip: true,
    size: "sm",
  },
};
