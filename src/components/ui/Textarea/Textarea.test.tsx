import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Textarea from "./Textarea";

describe("Textarea", () => {
  it("renders without crashing", () => {
    render(<Textarea data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toBeInTheDocument();
  });

  it("renders with placeholder", () => {
    const placeholder = "Enter text here";
    render(<Textarea placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const customClass = "custom-textarea";
    render(<Textarea className={customClass} data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toHaveClass(customClass);
  });

  it("applies error styling when error prop is true", () => {
    render(<Textarea error data-testid="textarea" />);
    const textarea = screen.getByTestId("textarea");
    expect(textarea).toHaveClass("border-red-500");
  });

  it("applies resize class correctly", () => {
    render(<Textarea resize="none" data-testid="textarea" />);
    const textarea = screen.getByTestId("textarea");
    expect(textarea).toHaveClass("resize-none");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Textarea disabled data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toBeDisabled();
  });
});
