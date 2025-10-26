import { render, screen, fireEvent } from "@/__tests__/utils";
import "@testing-library/jest-dom";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
  it("renders without crashing", () => {
    render(<Checkbox data-testid="checkbox" />);
    expect(screen.getByTestId("checkbox")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("handles checked state", () => {
    render(<Checkbox label="Test" defaultChecked data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it("handles onChange event", () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Test" onChange={handleChange} data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox");
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders in disabled state", () => {
    render(<Checkbox label="Test" disabled data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox") as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
  });

  it("displays error message", () => {
    render(<Checkbox label="Test" error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("applies different sizes", () => {
    const { rerender } = render(<Checkbox size="sm" data-testid="checkbox" />);
    expect(screen.getByTestId("checkbox")).toHaveClass("h-4 w-4");

    rerender(<Checkbox size="lg" data-testid="checkbox" />);
    expect(screen.getByTestId("checkbox")).toHaveClass("h-6 w-6");
  });
});
