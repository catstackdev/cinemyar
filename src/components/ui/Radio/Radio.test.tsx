import { render, screen, fireEvent } from "@/__tests__/utils";
import "@testing-library/jest-dom";
import Radio from "./Radio";

describe("Radio", () => {
  it("renders without crashing", () => {
    render(<Radio data-testid="radio" />);
    expect(screen.getByTestId("radio")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Radio label="Option A" />);
    expect(screen.getByText("Option A")).toBeInTheDocument();
  });

  it("handles checked state", () => {
    render(<Radio label="Test" defaultChecked data-testid="radio" />);
    const radio = screen.getByTestId("radio") as HTMLInputElement;
    expect(radio.checked).toBe(true);
  });

  it("handles onChange event", () => {
    const handleChange = jest.fn();
    render(<Radio label="Test" onChange={handleChange} data-testid="radio" />);
    const radio = screen.getByTestId("radio");
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders in disabled state", () => {
    render(<Radio label="Test" disabled data-testid="radio" />);
    const radio = screen.getByTestId("radio") as HTMLInputElement;
    expect(radio.disabled).toBe(true);
  });

  it("displays description", () => {
    render(<Radio label="Test" description="This is a description" />);
    expect(screen.getByText("This is a description")).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(<Radio label="Test" error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
