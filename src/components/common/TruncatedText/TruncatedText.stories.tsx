import type { Meta, StoryObj } from "@storybook/react-vite";
import TruncatedText from "./TruncatedText";

const meta: Meta<typeof TruncatedText> = {
  title: "Components/Common/TruncatedText",
  component: TruncatedText,
  decorators: [
    (Story: React.ComponentType) => (
      <div className="p-8 bg-background">
        <div className="max-w-md">
          <Story />
        </div>
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: "text",
      description: "The text content to display",
    },
    maxLength: {
      control: { type: "number", min: 10, max: 200 },
      description: "Maximum characters before truncation",
    },
    placeholder: {
      control: "text",
      description: "Text to show when value is null/undefined",
    },
    tooltipPosition: {
      control: { type: "select", options: ["top", "bottom", "left", "right"] },
      description: "Tooltip position",
    },
    disableTooltip: {
      control: "boolean",
      description: "Disable tooltip functionality",
    },
    alwaysShowTooltip: {
      control: "boolean",
      description: "Show tooltip even for non-truncated text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TruncatedText>;

export const Default: Story = {
  args: {
    text: "This is a default text that will be displayed without truncation",
    maxLength: 50,
  },
};

export const Truncated: Story = {
  args: {
    text: "This is a very long text that will definitely be truncated because it exceeds the maximum length limit that we have set for this component demonstration",
    maxLength: 50,
  },
};

export const ShortText: Story = {
  args: {
    text: "Short",
    maxLength: 50,
  },
};

export const NullText: Story = {
  args: {
    text: null,
    maxLength: 50,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    text: null,
    placeholder: "No description provided",
    maxLength: 50,
  },
};

export const WithoutTooltip: Story = {
  args: {
    text: "This is a very long text that will be truncated but without showing a tooltip on hover",
    maxLength: 30,
    disableTooltip: true,
  },
};

export const AlwaysShowTooltip: Story = {
  args: {
    text: "Short text with tooltip",
    maxLength: 50,
    alwaysShowTooltip: true,
  },
};

export const MultilineText: Story = {
  args: {
    text: "This is a multiline text.\nIt contains line breaks.\nAnd should be displayed properly in the tooltip when truncated.",
    maxLength: 40,
  },
};

export const VeryLongText: Story = {
  args: {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    maxLength: 60,
  },
};

export const CustomStyling: Story = {
  args: {
    text: "This text has custom styling applied to it for demonstration purposes",
    maxLength: 30,
    className: "text-primary font-semibold italic",
  },
};

export const BottomTooltip: Story = {
  args: {
    text: "This text shows tooltip at the bottom instead of the default top position",
    maxLength: 35,
    tooltipPosition: "bottom",
  },
};

export const InTableCell: Story = {
  decorators: [
    (Story: React.ComponentType) => (
      <div className="p-8 bg-background">
        <table className="min-w-full border border-border">
          <thead>
            <tr>
              <th className="border border-border p-2 text-left">Name</th>
              <th className="border border-border p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-2">Role 1</td>
              <td className="border border-border p-2 max-w-xs">
                <Story />
              </td>
            </tr>
            <tr>
              <td className="border border-border p-2">Role 2</td>
              <td className="border border-border p-2 max-w-xs">
                <TruncatedText
                  text="Another role with a different description that is also quite long"
                  maxLength={40}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  ],
  args: {
    text: "This is a role description that demonstrates how the component works inside a table cell with limited width",
    maxLength: 40,
  },
};
