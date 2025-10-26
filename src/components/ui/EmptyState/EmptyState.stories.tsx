import type { Meta, StoryObj } from "@storybook/react-vite";
import EmptyState from "./EmptyState";

const meta = {
  title: "Components/UI/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

const EmptyIcon = () => (
  <svg
    className="h-16 w-16"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
    />
  </svg>
);

export const Default: Story = {
  args: {
    title: "No data available",
  },
};

export const WithDescription: Story = {
  args: {
    title: "No results found",
    description: "We couldn't find any results matching your search criteria.",
  },
};

export const WithIcon: Story = {
  args: {
    icon: <EmptyIcon />,
    title: "No files uploaded",
    description: "Get started by uploading your first file.",
  },
};

export const WithAction: Story = {
  args: {
    icon: <EmptyIcon />,
    title: "No projects yet",
    description: "Create your first project to get started.",
    action: (
      <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
        Create Project
      </button>
    ),
  },
};

export const NoResults: Story = {
  args: {
    icon: (
      <svg
        className="h-16 w-16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    title: "No search results",
    description: "Try adjusting your search or filter to find what you're looking for.",
    action: (
      <button className="text-sm text-blue-600 hover:underline">
        Clear filters
      </button>
    ),
  },
};

export const EmptyInbox: Story = {
  args: {
    icon: (
      <svg
        className="h-16 w-16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
        />
      </svg>
    ),
    title: "All caught up!",
    description: "You have no new messages.",
  },
};
