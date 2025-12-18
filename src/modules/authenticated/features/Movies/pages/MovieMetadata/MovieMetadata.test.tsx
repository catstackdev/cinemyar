import { render, screen } from "@testing-library/react";
import MovieMetadata from "./MovieMetadata";

describe("MovieMetadata", () => {
  it("renders without error", () => {
    render(<MovieMetadata />);
    // Optional: simple check
    expect(screen.getByText(/MovieMetadata/i)).toBeInTheDocument();
  });
});
