import { render, screen } from "@testing-library/react";
import MovieEncoding from "./MovieEncoding";

describe("MovieEncoding", () => {
  it("renders without error", () => {
    render(<MovieEncoding />);
    // Optional: simple check
    expect(screen.getByText(/MovieEncoding/i)).toBeInTheDocument();
  });
});
