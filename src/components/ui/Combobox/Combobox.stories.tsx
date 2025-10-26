import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Combobox from "./Combobox";
import type { ComboboxOption } from "./Combobox.types";

const meta = {
  title: "Components/UI/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const countries: ComboboxOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "uk", label: "United Kingdom" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
];

export const Default: Story = {
  args: {
    options: countries,
    placeholder: "Search countries...",
  },
};

export const WithValue: Story = {
  args: {
    options: countries,
    value: "us",
    placeholder: "Search countries...",
  },
};

export const Disabled: Story = {
  args: {
    options: countries,
    disabled: true,
    value: "us",
  },
};

export const ErrorState: Story = {
  args: {
    options: countries,
    error: true,
    placeholder: "Invalid selection",
  },
};

export const Controlled: Story = {
  args: {
    options: countries,
  },
  render: () => {
    const ControlledExample = () => {
      const [value, setValue] = useState("");

      return (
        <div className="w-96 space-y-4">
          <Combobox
            options={countries}
            value={value}
            onChange={setValue}
            placeholder="Search countries..."
          />
          {value && (
            <p className="text-sm text-gray-600">
              Selected: {countries.find((c) => c.value === value)?.label}
            </p>
          )}
        </div>
      );
    };

    return <ControlledExample />;
  },
};

export const CustomRender: Story = {
  args: {
    options: countries,
  },
  render: () => {
    const [value, setValue] = useState("");

    const countryFlags: Record<string, string> = {
      us: "🇺🇸",
      ca: "🇨🇦",
      mx: "🇲🇽",
      uk: "🇬🇧",
      fr: "🇫🇷",
      de: "🇩🇪",
      jp: "🇯🇵",
      cn: "🇨🇳",
    };

    return (
      <div className="w-96">
        <Combobox
          options={countries}
          value={value}
          onChange={setValue}
          placeholder="Search countries..."
          renderOption={(option) => (
            <span className="flex items-center gap-2">
              <span>{countryFlags[option.value]}</span>
              <span>{option.label}</span>
            </span>
          )}
        />
      </div>
    );
  },
};
