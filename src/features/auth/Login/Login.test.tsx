import { render, screen } from "@testing-library/react";
import Login from "./Login";

describe("Login", () => {
  it("renders without error", () => {
    render(<Login />);
    // Optional: simple check
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
