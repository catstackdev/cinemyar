import type { Meta, StoryObj } from "@storybook/react-vite";
import Card from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/UI/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Default card
export const Default: Story = {
  args: {
    children: "This is a default card.",
  },
};

// Card with custom class
export const CustomClass: Story = {
  args: {
    children: "This card has a custom class.",
    className: "bg-primary text-primary-foreground shadow-lg",
  },
};

// Card with more content
export const WithContent: Story = {
  args: {
    children: `
      Card Title
      This is some detailed content inside the card.
    `,
  },
};
