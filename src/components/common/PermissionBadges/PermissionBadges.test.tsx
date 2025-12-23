import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PermissionBadges from "./PermissionBadges";
import "@testing-library/jest-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("PermissionBadges", () => {
  it("renders 'No permissions' when permissions array is empty", () => {
    render(<PermissionBadges permissions={[]} />, { wrapper });
    expect(screen.getByText("No permissions")).toBeInTheDocument();
  });

  it("renders component without crashing with valid permissions", () => {
    const permissions = ["movie.view", "movie.edit", "user.view"];
    const { container } = render(
      <PermissionBadges permissions={permissions} />,
      { wrapper },
    );
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <PermissionBadges permissions={[]} className="custom-class" />,
      { wrapper },
    );
    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });

  it("respects maxDisplay prop", () => {
    const permissions = ["movie.view", "user.view"];
    render(
      <PermissionBadges permissions={permissions} maxDisplay={1} />,
      { wrapper },
    );
    // Should show +1 badge for remaining permissions
    expect(screen.queryByText("+1")).toBeInTheDocument();
  });
});
