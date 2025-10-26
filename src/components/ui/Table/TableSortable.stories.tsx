import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableSortableHead,
  useTableSort,
} from "./";

const meta = {
  title: "Components/UI/Table/Sortable",
  component: Table,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const sampleData: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Admin", status: "Active" },
];

export const SortableTable: Story = {
  args: {
    children: null,
  },
  render: () => {
    const SortableTableDemo = () => {
      const { sortedData, requestSort, getSortDirection } = useTableSort<User>(sampleData);

      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableSortableHead
                sortDirection={getSortDirection("id")}
                onSort={() => requestSort("id")}
              >
                ID
              </TableSortableHead>
              <TableSortableHead
                sortDirection={getSortDirection("name")}
                onSort={() => requestSort("name")}
              >
                Name
              </TableSortableHead>
              <TableSortableHead
                sortDirection={getSortDirection("email")}
                onSort={() => requestSort("email")}
              >
                Email
              </TableSortableHead>
              <TableSortableHead
                sortDirection={getSortDirection("role")}
                onSort={() => requestSort("role")}
              >
                Role
              </TableSortableHead>
              <TableSortableHead
                sortDirection={getSortDirection("status")}
                onSort={() => requestSort("status")}
              >
                Status
              </TableSortableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    };

    return <SortableTableDemo />;
  },
};

export const DefaultSort: Story = {
  args: {
    children: null,
  },
  render: () => {
    const DefaultSortDemo = () => {
      const { sortedData, requestSort, getSortDirection } = useTableSort<User>(
        sampleData,
        "name",
        "asc"
      );

      return (
        <div>
          <p className="mb-4 text-sm text-gray-600">Table sorted by name by default</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableSortableHead
                  sortDirection={getSortDirection("name")}
                  onSort={() => requestSort("name")}
                >
                  Name
                </TableSortableHead>
                <TableSortableHead
                  sortDirection={getSortDirection("email")}
                  onSort={() => requestSort("email")}
                >
                  Email
                </TableSortableHead>
                <TableSortableHead
                  sortDirection={getSortDirection("role")}
                  onSort={() => requestSort("role")}
                >
                  Role
                </TableSortableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      );
    };

    return <DefaultSortDemo />;
  },
};
