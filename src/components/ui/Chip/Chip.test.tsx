import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Chip from "./Chip";

describe("Chip", () => {
  it("renders without crashing", () => {
    render(<Chip data-testid="chip">Test</Chip>);
    expect(screen.getByTestId("chip")).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    const text = "Chip Label";
    render(<Chip>{text}</Chip>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const customClass = "custom-chip";
    render(<Chip className={customClass} data-testid="chip">Test</Chip>);
    expect(screen.getByTestId("chip")).toHaveClass(customClass);
  });

  it("applies variant styling correctly", () => {
    render(<Chip variant="primary" data-testid="chip">Test</Chip>);
    const chip = screen.getByTestId("chip");
    expect(chip).toHaveClass("bg-blue-100");
  });

  it("applies size styling correctly", () => {
    render(<Chip size="sm" data-testid="chip">Test</Chip>);
    const chip = screen.getByTestId("chip");
    expect(chip).toHaveClass("text-xs");
  });

  it("renders icon when provided", () => {
    const icon = <span data-testid="icon">★</span>;
    render(<Chip icon={icon}>Test</Chip>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders remove button when onRemove is provided", () => {
    const onRemove = jest.fn();
    render(<Chip onRemove={onRemove}>Test</Chip>);
    const removeButton = screen.getByRole("button");
    expect(removeButton).toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", () => {
    const onRemove = jest.fn();
    render(<Chip onRemove={onRemove}>Test</Chip>);
    const removeButton = screen.getByRole("button");
    fireEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
