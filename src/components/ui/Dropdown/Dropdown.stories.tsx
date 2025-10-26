import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSeparator,
} from "./";

const meta = {
  title: "Components/UI/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const EditIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ShareIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

export const Default: Story = {
  args: { children: null },
  render: () => (
    <Dropdown>
      <DropdownTrigger className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
        Options ▼
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem icon={<EditIcon />}>Edit</DropdownItem>
        <DropdownItem icon={<ShareIcon />}>Share</DropdownItem>
        <DropdownSeparator />
        <DropdownItem icon={<DeleteIcon />} destructive>
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};

export const Alignment: Story = {
  args: { children: null },
  render: () => (
    <div className="flex gap-8">
      <Dropdown>
        <DropdownTrigger className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm">
          Align Start ▼
        </DropdownTrigger>
        <DropdownMenu align="start">
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm">
          Align Center ▼
        </DropdownTrigger>
        <DropdownMenu align="center">
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm">
          Align End ▼
        </DropdownTrigger>
        <DropdownMenu align="end">
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  ),
};

export const WithDisabledItems: Story = {
  args: { children: null },
  render: () => (
    <Dropdown>
      <DropdownTrigger className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm">
        Actions ▼
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem icon={<EditIcon />}>Edit</DropdownItem>
        <DropdownItem icon={<ShareIcon />} disabled>
          Share (disabled)
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem icon={<DeleteIcon />} destructive>
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};

export const UserMenu: Story = {
  args: { children: null },
  render: () => (
    <Dropdown>
      <DropdownTrigger className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-sm">
        <div className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
          JD
        </div>
        John Doe ▼
      </DropdownTrigger>
      <DropdownMenu align="end">
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Billing</DropdownItem>
        <DropdownSeparator />
        <DropdownItem>Sign out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};
