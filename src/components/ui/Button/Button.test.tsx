import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // For the toBeInTheDocument matcher
import Button from "./Button";

describe("Button", () => {
  // Test 1: Renders the component without crashing
  it("renders without crashing", () => {
    render(<Button data-testid="button" />);
    expect(screen.getByTestId("button")).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it("renders children passed to it", () => {
    const testChildText = "Hello World";
    render(<Button>{testChildText}</Button>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it("applies a custom className", () => {
    const customClass = "test-class";
    render(<Button className={customClass} />);
    expect(screen.getByTestId("button")).toHaveClass(customClass);
  });

  // Test 4: Renders as a different element when 'as' prop is used
  // it('renders as a different element when the "as" prop is used', () => {
  //   render(<Button as="span" data-testid="button" />);
  //   const component = screen.getByTestId('button');
  //   expect(component.tagName).toBe('SPAN'); // Check that the rendered element is a <span>
  // });
});
