import { render, screen } from "@testing-library/react";
import TruncatedText from "./TruncatedText";
import "@testing-library/jest-dom";

describe("TruncatedText", () => {
  it("renders placeholder when text is null", () => {
    render(<TruncatedText text={null} />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("renders placeholder when text is undefined", () => {
    render(<TruncatedText text={undefined} />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("renders custom placeholder", () => {
    render(<TruncatedText text={null} placeholder="N/A" />);
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });

  it("renders short text without truncation", () => {
    const shortText = "Short text";
    render(<TruncatedText text={shortText} maxLength={50} />);
    expect(screen.getByText(shortText)).toBeInTheDocument();
    expect(screen.queryByText(/\.\.\./)).not.toBeInTheDocument();
  });

  it("truncates long text", () => {
    const longText = "This is a very long text that should be truncated";
    render(<TruncatedText text={longText} maxLength={20} />);
    const displayText = screen.getByText(/\.\.\./);
    expect(displayText).toBeInTheDocument();
    expect(displayText.textContent).toContain("...");
  });

  it("applies custom className", () => {
    const { container } = render(
      <TruncatedText text="Test" className="custom-class" />,
    );
    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });

  it("shows full text with exact maxLength", () => {
    const text = "12345";
    render(<TruncatedText text={text} maxLength={5} />);
    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(screen.queryByText(/\.\.\./)).not.toBeInTheDocument();
  });

  it("truncates when text length exceeds maxLength by 1", () => {
    const text = "123456";
    render(<TruncatedText text={text} maxLength={5} />);
    expect(screen.getByText("12345...")).toBeInTheDocument();
  });

  it("trims whitespace before processing", () => {
    const text = "  Text with spaces  ";
    render(<TruncatedText text={text} maxLength={50} />);
    expect(screen.getByText("Text with spaces")).toBeInTheDocument();
  });

  it("renders empty string as placeholder", () => {
    render(<TruncatedText text="" />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("renders whitespace-only string as placeholder", () => {
    render(<TruncatedText text="   " />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });
});
