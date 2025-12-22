import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // For the toBeInTheDocument matcher
import LucideIcon from "./LucideIcon";

describe("LucideIcon", () => {
  // Test 1: Renders the component without crashing
  it("renders without crashing", () => {
    render(<LucideIcon data-testid="lucideIcon" />);
    expect(screen.getByTestId("lucideIcon")).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it("renders children passed to it", () => {
    const testChildText = "Hello World";
    render(<LucideIcon>{testChildText}</LucideIcon>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it("applies a custom className", () => {
    const customClass = "test-class";
    render(<LucideIcon className={customClass} />);
    expect(screen.getByTestId("lucideIcon")).toHaveClass(customClass);
  });
});
