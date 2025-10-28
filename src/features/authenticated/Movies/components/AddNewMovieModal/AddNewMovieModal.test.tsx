import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // For the toBeInTheDocument matcher
import AddNewMovieModal from "./AddNewMovieModal";

describe("AddNewMovieModal", () => {
  // Test 1: Renders the component without crashing
  it("renders without crashing", () => {
    render(<AddNewMovieModal data-testid="addNewMovieModal" />);
    expect(screen.getByTestId("addNewMovieModal")).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it("renders children passed to it", () => {
    const testChildText = "Hello World";
    render(<AddNewMovieModal>{testChildText}</AddNewMovieModal>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  // Test 4: Renders as a different element when 'as' prop is used
});
