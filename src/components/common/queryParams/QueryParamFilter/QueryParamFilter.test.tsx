import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // For the toBeInTheDocument matcher
import QueryParamFilter from "./QueryParamFilter";

describe("QueryParamFilter", () => {
  // Test 1: Renders the component without crashing
  it("renders without crashing", () => {
    render(<QueryParamFilter data-testid="queryParamFilter" />);
    expect(screen.getByTestId("queryParamFilter")).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it("renders children passed to it", () => {
    const testChildText = "Hello World";
    render(<QueryParamFilter>{testChildText}</QueryParamFilter>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it("applies a custom className", () => {
    const customClass = "test-class";
    render(<QueryParamFilter className={customClass} />);
    expect(screen.getByTestId("queryParamFilter")).toHaveClass(customClass);
  });
});
