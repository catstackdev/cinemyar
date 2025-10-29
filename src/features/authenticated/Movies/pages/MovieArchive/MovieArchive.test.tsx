import { render, screen } from "@testing-library/react";
import MovieArchive from "./MovieArchive";

describe("MovieArchive", () => {
  it("renders without error", () => {
    render(<MovieArchive />);
    // Optional: simple check
    expect(screen.getByText(/MovieArchive/i)).toBeInTheDocument();
  });
});
