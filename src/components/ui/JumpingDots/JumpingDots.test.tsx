import { render } from "@testing-library/react";
import JumpingDots from "./JumpingDots";

describe("JumpingDots", () => {
  it("renders default 3 dots", () => {
    const { container } = render(<JumpingDots />);
    const dots = container.querySelectorAll("span span");
    expect(dots).toHaveLength(3);
  });

  it("renders custom number of dots", () => {
    const { container } = render(<JumpingDots count={5} />);
    const dots = container.querySelectorAll("span span");
    expect(dots).toHaveLength(5);
  });

  it("applies custom className", () => {
    const { container } = render(<JumpingDots className="custom-class" />);
    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });

  it("applies custom dot className", () => {
    const { container } = render(<JumpingDots dotClassName="text-blue-500" />);
    const firstDot = container.querySelector("span span");
    expect(firstDot).toHaveClass("text-blue-500");
  });
});
