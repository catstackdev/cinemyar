import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // For the toBeInTheDocument matcher
import ParamFilterDropdown from "./ParamFilterDropdown";

describe("ParamFilterDropdown", () => {
  // Test 1: Renders the component without crashing
  it("renders without crashing", () => {
    render(<ParamFilterDropdown data-testid="paramFilterDropdown" />);
    expect(screen.getByTestId("paramFilterDropdown")).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it("renders children passed to it", () => {
    const testChildText = "Hello World";
    render(<ParamFilterDropdown>{testChildText}</ParamFilterDropdown>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it("applies a custom className", () => {
    const customClass = "test-class";
    render(<ParamFilterDropdown className={customClass} />);
    expect(screen.getByTestId("paramFilterDropdown")).toHaveClass(customClass);
  });
});
