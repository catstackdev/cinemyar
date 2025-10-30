import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./Button";

import {
  PlusIcon,
  TrashIcon,
  DownloadIcon,
  CheckIcon,
} from "@radix-ui/react-icons";

const meta = {
  title: "Components/UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "clear", "link", "gradient", "glass"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "danger", "success", "info", "warning"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    elevation: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
    isLoading: {
      control: "boolean",
    },
    isDisabled: {
      control: "boolean",
    },
    iconOnly: {
      control: "boolean",
    },
    withRipple: {
      control: "boolean",
    },
    withPulse: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    color: "primary",
    size: "md",
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center flex-wrap">
        <Button variant="default" color="primary">
          Default
        </Button>
        <Button variant="outline" color="primary">
          Outline
        </Button>
        <Button variant="clear" color="primary">
          Clear
        </Button>
        <Button variant="link" color="primary">
          Link
        </Button>
        <Button variant="gradient" color="primary">
          Gradient
        </Button>
        <Button variant="glass" color="primary">
          Glass
        </Button>
      </div>
    </div>
  ),
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="danger">Danger</Button>
        <Button color="success">Success</Button>
        <Button color="info">Info</Button>
        <Button color="warning">Warning</Button>
      </div>
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button leftIcon={<PlusIcon className="w-5 h-5" />}>Add Item</Button>
        <Button rightIcon={<DownloadIcon className="w-5 h-5" />}>
          Download
        </Button>
        <Button
          leftIcon={<CheckIcon className="w-5 h-5" />}
          rightIcon={<DownloadIcon className="w-5 h-5" />}
        >
          Save & Download
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" leftIcon={<PlusIcon className="w-5 h-5" />}>
          Add Item
        </Button>
        <Button
          variant="clear"
          rightIcon={<TrashIcon className="w-5 h-5" />}
          color="danger"
        >
          Delete
        </Button>
      </div>
    </div>
  ),
};

// Loading States
export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button isLoading>Loading</Button>
        <Button variant="outline" isLoading>
          Loading
        </Button>
        <Button variant="clear" isLoading>
          Loading
        </Button>
      </div>
      <div className="flex gap-2">
        <Button isLoading color="danger">
          Deleting
        </Button>
        <Button isLoading color="success">
          Saving
        </Button>
        <Button isLoading color="warning">
          Processing
        </Button>
      </div>
    </div>
  ),
};

// Disabled States
export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button isDisabled>Disabled</Button>
        <Button variant="outline" isDisabled>
          Disabled
        </Button>
        <Button variant="clear" isDisabled>
          Disabled
        </Button>
        <Button variant="link" isDisabled>
          Disabled
        </Button>
      </div>
    </div>
  ),
};

// All Variant + Color Combinations
export const AllCombinations: Story = {
  render: () => (
    <div className="space-y-6">
      {(["default", "outline", "clear", "link", "gradient", "glass"] as const).map((variant) => (
        <div key={variant} className="space-y-2">
          <h3 className="text-sm font-semibold capitalize">{variant}</h3>
          <div className="flex gap-2 flex-wrap">
            {(
              [
                "primary",
                "secondary",
                "danger",
                "success",
                "info",
                "warning",
              ] as const
            ).map((color) => (
              <Button key={color} variant={variant} color={color}>
                {color}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// Interactive Playground
export const Playground: Story = {
  args: {
    children: "Click me",
    variant: "default",
    color: "primary",
    size: "md",
    isLoading: false,
    isDisabled: false,
  },
};

// Real World Examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4 max-w-md">
      {/* Form Actions */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Form Actions</h3>
        <div className="flex gap-2">
          <Button color="primary">Submit</Button>
          <Button variant="outline" color="secondary">
            Cancel
          </Button>
        </div>
      </div>

      {/* CRUD Actions */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">CRUD Actions</h3>
        <div className="flex gap-2">
          <Button leftIcon={<PlusIcon className="w-5 h-5" />} size="sm">
            Create
          </Button>
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="clear" color="danger" size="sm">
            Delete
          </Button>
        </div>
      </div>

      {/* Loading Example */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Async Action</h3>
        <Button isLoading color="success">
          Saving Changes...
        </Button>
      </div>

      {/* Card Actions */}
      <div className="border rounded-lg p-4 space-y-4">
        <div>
          <h4 className="font-medium">Product Name</h4>
          <p className="text-sm text-gray-600">Product description here</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm">Add to Cart</Button>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </div>

      {/* Alert Actions */}
      <div className="border border-red-200 bg-red-50 rounded-lg p-4 space-y-3">
        <div>
          <h4 className="font-medium text-red-900">Delete Account</h4>
          <p className="text-sm text-red-700">This action cannot be undone</p>
        </div>
        <div className="flex gap-2">
          <Button color="danger" size="sm">
            Confirm Delete
          </Button>
          <Button variant="outline" color="secondary" size="sm">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  ),
};

// Button Group
export const ButtonGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="inline-flex rounded-md shadow-sm">
        <Button className="rounded-r-none">Left</Button>
        <Button className="rounded-none border-l-0">Middle</Button>
        <Button className="rounded-l-none border-l-0">Right</Button>
      </div>

      <div className="inline-flex rounded-md shadow-sm">
        <Button variant="outline" className="rounded-r-none">
          Years
        </Button>
        <Button variant="outline" className="rounded-none border-l-0">
          Months
        </Button>
        <Button variant="outline" className="rounded-none border-l-0">
          Days
        </Button>
      </div>
    </div>
  ),
};

// Responsive Sizes
export const ResponsiveSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">Resize viewport to see changes</p>
      <Button className="text-xs sm:text-sm md:text-base lg:text-lg">
        Responsive Text
      </Button>
      <Button className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3">
        Responsive Padding
      </Button>
    </div>
  ),
};

// New Gradient Variant
export const GradientButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        <Button variant="gradient" color="primary">Primary Gradient</Button>
        <Button variant="gradient" color="secondary">Secondary Gradient</Button>
        <Button variant="gradient" color="danger">Danger Gradient</Button>
        <Button variant="gradient" color="success">Success Gradient</Button>
        <Button variant="gradient" color="info">Info Gradient</Button>
        <Button variant="gradient" color="warning">Warning Gradient</Button>
      </div>
    </div>
  ),
};

// Glass Variant
export const GlassButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
      <div className="flex gap-2 flex-wrap">
        <Button variant="glass" color="primary">Primary Glass</Button>
        <Button variant="glass" color="secondary">Secondary Glass</Button>
        <Button variant="glass" color="danger">Danger Glass</Button>
        <Button variant="glass" color="success">Success Glass</Button>
        <Button variant="glass" color="info">Info Glass</Button>
        <Button variant="glass" color="warning">Warning Glass</Button>
      </div>
    </div>
  ),
};

// Elevation
export const ElevationLevels: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button elevation="none">No Shadow</Button>
      <Button elevation="sm">Small Shadow</Button>
      <Button elevation="md">Medium Shadow</Button>
      <Button elevation="lg">Large Shadow</Button>
    </div>
  ),
};

// Icon Only
export const IconOnlyButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <Button iconOnly size="xs" leftIcon={<PlusIcon />} />
        <Button iconOnly size="sm" leftIcon={<PlusIcon />} />
        <Button iconOnly size="md" leftIcon={<PlusIcon />} />
        <Button iconOnly size="lg" leftIcon={<PlusIcon />} />
        <Button iconOnly size="xl" leftIcon={<PlusIcon />} />
      </div>
      <div className="flex gap-2 items-center">
        <Button iconOnly variant="outline" leftIcon={<TrashIcon />} color="danger" />
        <Button iconOnly variant="clear" leftIcon={<DownloadIcon />} color="info" />
        <Button iconOnly variant="gradient" leftIcon={<CheckIcon />} color="success" />
        <Button iconOnly variant="glass" leftIcon={<PlusIcon />} color="primary" />
      </div>
    </div>
  ),
};

// Ripple Effect
export const RippleEffect: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button withRipple>With Ripple (Default)</Button>
      <Button withRipple={false}>No Ripple</Button>
      <Button variant="gradient" withRipple>Gradient with Ripple</Button>
    </div>
  ),
};

// Pulse Animation
export const PulseAnimation: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button withPulse color="danger">Urgent Action</Button>
      <Button withPulse variant="gradient" color="success">Live Now</Button>
      <Button withPulse variant="outline" color="warning">New Notification</Button>
    </div>
  ),
};
