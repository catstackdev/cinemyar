import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MessageBox from "./MessageBox";

describe("MessageBox", () => {
  // Test 1: Renders the component without crashing
  it("renders without crashing", () => {
    render(<MessageBox data-testid="messageBox">Test content</MessageBox>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it("renders children passed to it", () => {
    const testChildText = "Hello World";
    render(<MessageBox>{testChildText}</MessageBox>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it("applies a custom className", () => {
    const customClass = "test-class";
    render(
      <MessageBox className={customClass} data-testid="messageBox">
        Content
      </MessageBox>,
    );
    const box = screen.getByTestId("messageBox");
    expect(box).toHaveClass(customClass);
  });

  // Test 4: Renders with portal background
  it("renders with portal background when withPortal is true", () => {
    render(
      <MessageBox withPortal portalVariant="cosmic">
        Portal Content
      </MessageBox>,
    );
    expect(screen.getByText("Portal Content")).toBeInTheDocument();
  });

  // Test 5: Applies variant styles
  it("applies variant styles correctly", () => {
    render(
      <MessageBox variant="danger" data-testid="messageBox">
        Danger message
      </MessageBox>,
    );
    const box = screen.getByTestId("messageBox");
    expect(box).toHaveClass("border-danger");
  });
});
