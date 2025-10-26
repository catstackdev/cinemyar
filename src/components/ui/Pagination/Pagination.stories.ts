import type { Meta, StoryObj } from "@storybook/react-vite";
import Pagination from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/UI/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    currentPage: { control: { type: "number", min: 1 } },
    totalPages: { control: { type: "number", min: 1 } },
    showFirstLast: { control: "boolean" },
    siblingCount: { control: { type: "number", min: 0, max: 5 } },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// Default story
export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    showFirstLast: true,
    siblingCount: 1,
  },
};

// Without First/Last buttons
export const WithoutFirstLast: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    showFirstLast: false,
    siblingCount: 1,
  },
};

// Many pages
export const ManyPages: Story = {
  args: {
    currentPage: 1,
    totalPages: 50,
    showFirstLast: true,
    siblingCount: 2,
  },
};
