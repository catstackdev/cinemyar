import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmptyState from "./EmptyState";

describe("EmptyState", () => {
  it("renders without crashing", () => {
    render(<EmptyState title="No data" data-testid="empty-state" />);
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("renders title correctly", () => {
    const title = "No results found";
    render(<EmptyState title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    const description = "Try adjusting your filters";
    render(<EmptyState title="No data" description={description} />);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    const icon = <span data-testid="icon">📁</span>;
    render(<EmptyState title="No data" icon={icon} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders action when provided", () => {
    const action = <button>Create New</button>;
    render(<EmptyState title="No data" action={action} />);
    expect(screen.getByRole("button", { name: /create new/i })).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const customClass = "custom-empty-state";
    render(<EmptyState title="No data" className={customClass} data-testid="empty-state" />);
    expect(screen.getByTestId("empty-state")).toHaveClass(customClass);
  });
});
