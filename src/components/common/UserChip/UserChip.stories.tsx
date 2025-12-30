import type { Meta, StoryObj } from "@storybook/react";
import UserChip from "./UserChip";

const meta: Meta<typeof UserChip> = {
  title: "Common/UserChip",
  component: UserChip,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showAvatar: {
      control: "boolean",
    },
    showRole: {
      control: "boolean",
    },
    showEmail: {
      control: "boolean",
    },
    clickable: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserChip>;

const mockUser = {
  id: "user-123",
  username: "john_doe",
  email: "john@example.com",
  role: "ADMIN",
  avatar: null,
};

const mockUserWithAvatar = {
  ...mockUser,
  avatar: "https://i.pravatar.cc/150?img=1",
};

export const Default: Story = {
  args: {
    user: mockUser,
    size: "md",
    showAvatar: false,
    showRole: false,
    showEmail: false,
    clickable: false,
  },
};

export const WithAvatar: Story = {
  args: {
    user: mockUserWithAvatar,
    size: "md",
    showAvatar: true,
    showRole: false,
    showEmail: false,
    clickable: false,
  },
};

export const WithRole: Story = {
  args: {
    user: mockUser,
    size: "md",
    showAvatar: false,
    showRole: true,
    showEmail: false,
    clickable: false,
  },
};

export const WithEmail: Story = {
  args: {
    user: mockUser,
    size: "md",
    showAvatar: false,
    showRole: false,
    showEmail: true,
    clickable: false,
  },
};

export const Complete: Story = {
  args: {
    user: mockUserWithAvatar,
    size: "md",
    showAvatar: true,
    showRole: true,
    showEmail: true,
    clickable: false,
  },
};

export const Clickable: Story = {
  args: {
    user: mockUserWithAvatar,
    size: "md",
    showAvatar: true,
    showRole: true,
    clickable: true,
    onUserClick: (userId: string) => alert(`Clicked user: ${userId}`),
  },
};

export const Small: Story = {
  args: {
    user: mockUserWithAvatar,
    size: "sm",
    showAvatar: true,
    showRole: true,
  },
};

export const Large: Story = {
  args: {
    user: mockUserWithAvatar,
    size: "lg",
    showAvatar: true,
    showRole: true,
    showEmail: true,
  },
};

export const NullUser: Story = {
  args: {
    user: null,
    size: "md",
    showAvatar: true,
    showRole: true,
  },
};

export const NoAvatar: Story = {
  args: {
    user: mockUser,
    size: "md",
    showAvatar: true,
    showRole: true,
  },
};
