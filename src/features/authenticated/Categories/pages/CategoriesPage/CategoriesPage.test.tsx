import { render, screen } from '@testing-library/react';
import CategoriesPage from './CategoriesPage';

describe('CategoriesPage', () => {
  it('renders without error', () => {
    render(<CategoriesPage />);
    // Optional: simple check
    expect(screen.getByText(/CategoriesPage/i)).toBeInTheDocument();
  });
});
