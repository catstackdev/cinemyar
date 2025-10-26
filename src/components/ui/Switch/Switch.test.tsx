import { render, screen, fireEvent } from "@/__tests__/utils";
import "@testing-library/jest-dom";
import Switch from "./Switch";

describe("Switch", () => {
  it("renders without crashing", () => {
    render(<Switch data-testid="switch" />);
    expect(screen.getByTestId("switch")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Switch label="Enable notifications" />);
    expect(screen.getByText("Enable notifications")).toBeInTheDocument();
  });

  it("handles checked state", () => {
    render(<Switch label="Test" defaultChecked data-testid="switch" />);
    const switchInput = screen.getByTestId("switch") as HTMLInputElement;
    expect(switchInput.checked).toBe(true);
  });

  it("handles onChange event", () => {
    const handleChange = jest.fn();
    render(<Switch label="Test" onChange={handleChange} data-testid="switch" />);
    const switchInput = screen.getByTestId("switch");
    fireEvent.click(switchInput);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders in disabled state", () => {
    render(<Switch label="Test" disabled data-testid="switch" />);
    const switchInput = screen.getByTestId("switch") as HTMLInputElement;
    expect(switchInput.disabled).toBe(true);
  });
});
