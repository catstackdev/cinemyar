import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import DatePicker from "./DatePicker";

const meta = {
  title: "Components/UI/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Select a date",
  },
};

export const WithValue: Story = {
  args: {
    value: new Date("2024-01-15"),
  },
};

export const WithMinMax: Story = {
  args: {
    minDate: new Date("2024-01-01"),
    maxDate: new Date("2024-12-31"),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: new Date(),
  },
};

export const ErrorState: Story = {
  args: {
    error: true,
    placeholder: "Invalid date",
  },
};

export const Controlled: Story = {
  args: {},
  render: () => {
    const ControlledExample = () => {
      const [date, setDate] = useState<Date | null>(null);

      return (
        <div className="w-96 space-y-4">
          <DatePicker
            value={date}
            onChange={setDate}
            placeholder="Select a date"
          />
          {date && (
            <p className="text-sm text-gray-600">
              Selected: {date.toLocaleDateString()}
            </p>
          )}
        </div>
      );
    };

    return <ControlledExample />;
  },
};
