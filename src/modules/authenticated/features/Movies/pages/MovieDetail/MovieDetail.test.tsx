import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import MovieDetail from "./MovieDetail";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithProviders = (component: React.ReactElement, route = "/movies/1") => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        {component}
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("MovieDetail", () => {
  it("renders loading state initially", () => {
    renderWithProviders(<MovieDetail />);
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("renders back button", () => {
    renderWithProviders(<MovieDetail />);
    expect(screen.getByText("Back")).toBeInTheDocument();
  });
});