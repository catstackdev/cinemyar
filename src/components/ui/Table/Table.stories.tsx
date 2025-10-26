import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./";

const meta = {
  title: "Components/UI/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithCaption: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Table>
      <TableCaption>A list of recent users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>Inactive</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithActions: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Laptop</TableCell>
          <TableCell>$999</TableCell>
          <TableCell>15</TableCell>
          <TableCell className="text-right">
            <button className="text-sm text-blue-600 hover:underline">Edit</button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Mouse</TableCell>
          <TableCell>$29</TableCell>
          <TableCell>50</TableCell>
          <TableCell className="text-right">
            <button className="text-sm text-blue-600 hover:underline">Edit</button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Striped: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Department</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="even:bg-gray-50">
          <TableCell>1</TableCell>
          <TableCell>Alice Brown</TableCell>
          <TableCell>Engineering</TableCell>
        </TableRow>
        <TableRow className="even:bg-gray-50">
          <TableCell>2</TableCell>
          <TableCell>Charlie Davis</TableCell>
          <TableCell>Marketing</TableCell>
        </TableRow>
        <TableRow className="even:bg-gray-50">
          <TableCell>3</TableCell>
          <TableCell>David Wilson</TableCell>
          <TableCell>Sales</TableCell>
        </TableRow>
        <TableRow className="even:bg-gray-50">
          <TableCell>4</TableCell>
          <TableCell>Eva Martinez</TableCell>
          <TableCell>HR</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
