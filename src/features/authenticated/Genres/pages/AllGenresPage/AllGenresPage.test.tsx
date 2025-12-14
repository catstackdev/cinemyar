import React from 'react';
import { render, screen } from '@testing-library/react';
import AllGenresPage from './AllGenresPage';

describe('AllGenresPage', () => {
  it('renders without error', () => {
    render(<AllGenresPage />);
    // Optional: simple check
    expect(screen.getByText(/AllGenresPage/i)).toBeInTheDocument();
  });
});
