import { render, screen } from "@testing-library/react";
import MovieSettings from "./MovieSettings";

describe("MovieSettings", () => {
  it("renders without error", () => {
    render(<MovieSettings />);
    // Optional: simple check
    expect(screen.getByText(/MovieSettings/i)).toBeInTheDocument();
  });
});
