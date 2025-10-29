import { render, screen } from "@testing-library/react";
import MovieAnalytics from "./MovieAnalytics";

describe("MovieAnalytics", () => {
  it("renders without error", () => {
    render(<MovieAnalytics />);
    expect(screen.getByText(/MovieAnalytics/i)).toBeInTheDocument();
  });
});
