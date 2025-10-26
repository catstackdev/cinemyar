import type { Meta, StoryObj } from "@storybook/react-vite";
import Breadcrumb from "./Breadcrumb";
import { FaHome, FaChevronRight } from "react-icons/fa";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  argTypes: {
    separator: { control: "text" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// Default breadcrumb
export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "/", icon: <FaHome /> },
      { label: "Library", href: "/library" },
      { label: "Data", href: "/library/data" },
    ],
    separator: "/",
  },
};

// Breadcrumb with icon separator
export const IconSeparator: Story = {
  args: {
    items: [
      { label: "Home", href: "/", icon: <FaHome /> },
      { label: "Library", href: "/library" },
      { label: "Data" },
    ],
    separator: <FaChevronRight className="text-gray-400" />,
  },
};

// Single item breadcrumb
export const SingleItem: Story = {
  args: {
    items: [{ label: "Home", href: "/" }],
  },
};
