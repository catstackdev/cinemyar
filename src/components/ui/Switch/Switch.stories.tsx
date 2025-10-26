import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Switch from "./Switch";

const meta = {
  title: "Components/UI/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Enable notifications",
  },
};

export const Checked: Story = {
  args: {
    label: "Enabled",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled switch",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled and checked",
    disabled: true,
    defaultChecked: true,
  },
};

export const Small: Story = {
  args: {
    label: "Small switch",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    label: "Medium switch (default)",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    label: "Large switch",
    size: "lg",
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const Controlled: Story = {
  render: function ControlledSwitch() {
    const [enabled, setEnabled] = useState(false);

    return (
      <div className="space-y-4">
        <Switch
          label="Toggle me"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        <p className="text-sm text-gray-600">
          Status: {enabled ? "ON" : "OFF"}
        </p>
      </div>
    );
  },
};

export const SettingsExample: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <h3 className="text-lg font-semibold">Settings</h3>
      <div className="space-y-3">
        <Switch label="Email notifications" defaultChecked />
        <Switch label="Push notifications" />
        <Switch label="SMS notifications" disabled />
        <Switch label="Dark mode" defaultChecked />
      </div>
    </div>
  ),
};
